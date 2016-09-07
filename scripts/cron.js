const CronJob = require('cron').CronJob;
const config = require('../server/settings');
const request = require('request-promise');
const knex = require('knex');
const moment = require('moment');

const db = knex({
  client: 'mysql',
  connection: config.mysql.connection
});
const url = config.url;
const LOCAL_TIME = config.localTime;
const TABLE_NAME = config.mysql.casesTable;
const cronPattern = config.cronPattern;
const internal = {
  counter: 0
};

internal.parseLocation = (point) => {
  if (point && point.longitude && point.latitude) {
    const mysqlPoint = `'POINT(${parseFloat(point.longitude)} ${parseFloat(point.latitude)})'`;
    return `ST_GeomFromText('${mysqlPoint}')END_ST_GeomFromText`;
  }
  // Default location is BORA BORA!!
  return "ST_GeomFromText(''POINT(-151.7414904 -16.5004)'')END_ST_GeomFromText";
};

internal.insertData = (data) => {
  console.log(`size: ${data.length}`);
  return Promise.all(JSON.parse(data).map(internal.parseData));
};

internal.start = () => {
  console.log('Running cron job');
  request(url)
    .then(internal.insertData)
    .then(() => {
      console.log('done');
      console.log(internal.counter);
    })
  .catch((err) => {
    console.log(internal.counter);
    console.error('err');
    console.error(JSON.stringify(err));
  })
  .finally(() => {
    console.log('Finally!');
    console.log(internal.counter);
  });
};
internal.run = () => {
  try {
    const cronJob = new CronJob(cronPattern, internal.start, null, true, LOCAL_TIME);
    cronJob();
  } catch (ex) {
    console.log('cron pattern not valid');
  }
};

internal.parseData = (obj) => {
  internal.counter++;
  const tmpObj = {
    case_id: parseInt(obj.case_id, 10), // int
    address: obj.address || null, // string
    opened: obj.opened || moment().format('YYYY-MM-DD"T"HH:mm:dd'), // timestamp
    location: internal.parseLocation(obj.point), // lat/lng
    source: obj.source || null, // string
    status_notes: obj.status_notes || null, // string
    supervisor_district: obj.supervisor_district || null, // string
    human_address: obj.point && obj.point.human_address ? JSON.parse(obj.point.human_address) : {},
    needs_recoding: obj.point && !!obj.point.needs_recoding,
    responsible_agency: obj.responsible_agency || null,
    neighborhood: obj.neighborhood || null,
    category: obj.category || null,
    updated: obj.updated || null,
    status: obj.status, // Open or Closed
    status_code: obj.status && obj.status.toLowerCase() === 'open',
    url: obj.media_url && obj.media_url.url ? obj.media_url.url : null
  };
  // console.log(tmpObj.status_code);
  const rawQuery = db(TABLE_NAME).insert(tmpObj).returning('*').toString()
  .replace("'ST_GeomFromText", 'ST_GeomFromText')
  .replace("END_ST_GeomFromText'", '')
  .replace(new RegExp(/''''/, 'g'), "'");

  return db.raw(rawQuery).catch(err => {
    console.log(rawQuery);
    console.log('\nError::: Debug');
    console.log(JSON.stringify(err));
    return Promise.reject(err);
  });
};

module.exports = internal;
