const mysql = require('knex')({ client: 'mysql' });
const settings = require('../settings');

const TableName = settings.mysql.casesTable;
const handleError = (request, reply, err) => reply({ code: 'error', body: err });

const limitLatLang = (num, type) => {
  if (type === 'long' && Math.abs(num) > 180) {
    return num > 180 ? 180 : -180;
  } else if (type === 'lat' && Math.abs(num) > 90) {
    return num > 90 ? 90 : -90;
  }
  return num;
};
module.exports = {
  getAll(request, reply) {
    let query;
    if (request.query.near !== null) {
      // Search by lat/lng
      const latitude = parseFloat(request.query.near.split(',')[0]); // -90,90
      const longitude = parseFloat(request.query.near.split(',')[1]);// -180,180
      const radius = parseInt(request.query.radius, 10);
      // validate latitude and longitude range
      const point1 = {
        lat: limitLatLang((latitude + (radius / 111)), 'lat'),
        long: limitLatLang((longitude + (radius / 111)), 'long')
      };
      const point2 = {
        lat: limitLatLang((latitude - (radius / 111)), 'lat'),
        long: limitLatLang((longitude - (radius / 111)), 'long')
      };
      query = mysql(TableName).select(mysql.raw(
        `*, ST_Distance_Sphere(POINT(${longitude}, ${latitude}), location) as distance_in_meters`))
        .whereRaw(`ST_Contains( ST_MakeEnvelope(
        Point(${point1.long}, ${point1.lat}),
        Point(${point2.long}, ${point2.lat})
      ), location )`);
    } else {
      query = mysql('cases').select('*');
    }
    if (request.query.since !== null) {
      query = query.where('opened', '>=', request.query.since);
    }
    if (request.query.status !== null) {
      const isOpen = request.query.status.toLowerCase() === 'open' ? 1 : 0;
      query = query.where('status_code', '=', isOpen);
    }
    if (request.query.category !== null) {
      query = query.where('category', request.query.category);
    }

    query = query
      .limit(request.query.limit)
      .offset(request.query.offset);
    if (request.query.near !== null) {
      query = query.orderBy('distance_in_meters');
    }

    query = query.returning('*').toString();
    request.app.db.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        return handleError(request, reply, err);
      }
      const body = {
        cases: rows
      };
      if (request.query.near !== null) {
        body.radius = `${request.query.radius}km`;
      }

      return reply({
        code: 'ok',
        body
      });
    });
  },
  getOne(request, reply) {
    const query = mysql(TableName)
      .select('*')
      .where('case_id', request.params.id)
      .limit(1)
      .returning('*')
      .toString();
    request.app.db.query(query, (err, rows) => {
      if (err) {
        return handleError(request, reply, err);
      }
      return reply({ code: 'ok', body: { case: rows[0] } });
    });
  }
};
