const CronJob = require('cron').CronJob;
const config = require('../server/settings');
const request = require('request-promise');
const db = require('./db');
const moment = require('moment');

let counter = 0;
const url = `http://data.sfgov.org/resource/vw6y-z8j6.json`; // url to fetch data from
const LOCAL_TIME = 'America/Los_Angeles';
const TABLE_NAME = config.mysql.casesTable;
const cronPattern = '00 00 00 * * 0-6'; // everyday at midnight


const parseLocation = (point) => {
  if (point && point.longitude && point.latitude) {
    return `ST_GeomFromText("POINT(${parseFloat(point.longitude)} ${parseFloat(point.latitude)})")`;
  }

  return 'ST_GeomFromText("POINT(-16.5004 -151.7414904)")';
};

const parseData = (obj) => {
  counter++;
  const tmpObj = {
    case_id: parseInt(obj.case_id, 10), // int
    address: obj.address || '', // string
    opened: obj.opened || moment().format('YYYY-MM-DD"T"HH:mm:dd'), // timestamp
    location: parseLocation(obj.point),
    source: obj.source || '', // string
    status_notes: obj.status_notes || '', // string
    supervisor_district: obj.supervisor_district || '', // string
    human_address: obj.point && obj.point.human_address ? JSON.parse(obj.point.human_address) : {},
    needs_recoding: obj.point ? obj.point.needs_recoding : false,
    responsible_agency: obj.responsible_agency || '',
    neighborhood: obj.neighborhood || '',
    category: obj.category || '',
    updated: obj.updated || null,
    status: obj.status, // Open or Closed
    status_code: obj.staus === 'Open'
  };

  return db.raw(`insert into ${TABLE_NAME}
  (case_id, address, opened, location, source, status_notes, supervisor_district,
  human_address, needs_recoding, responsible_agency, neighborhood,
  category, updated, status, status_code)
  VALUES (${tmpObj.case_id}, '${tmpObj.address}', '${tmpObj.opened}',
  ${tmpObj.location}, "${tmpObj.source}", "${tmpObj.status_notes}", ${tmpObj.supervisor_district},
  '${JSON.stringify(tmpObj.human_address)}', ${tmpObj.needs_recoding},
  "${tmpObj.responsible_agency}", "${tmpObj.neighborhood}",
  "${tmpObj.category}",
  '${tmpObj.updated}', "${tmpObj.status}", ${tmpObj.status_code})`).catch(err => {
    console.log('\nError::: Debug');
    console.log(JSON.stringify(err));
    console.log(tmpObj);
    return Promise.reject(err);
  });
};



const insertData = (data) => {
  console.log(`size: ${data.length}`);
  return Promise.all(JSON.parse(data).map(parseData));
};


try {
  new CronJob(cronPattern, () => {
    request(url)
      .then(insertData)
      .then(() => {
        console.log('done');
        console.log(counter);
      })
    .catch((err) => {
      console.log(counter);
      console.error('err');
      console.error(JSON.stringify(err));
    })
    .finally(() => {
      console.log('Finally!');
      console.log(counter);
    });
  }, null, true, LOCAL_TIME);
} catch(ex) {
  console.log("cron pattern not valid");
}



