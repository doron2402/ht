const config = require('../server/settings');
const knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: config.mysql.connection
});
module.exports = () => {
  const query = `CREATE TABLE IF NOT EXISTS cases (
  case_id int(11) unsigned NOT NULL,
  address text,
  opened timestamp NULL DEFAULT NULL,
  location geometry NOT NULL,
  source varchar(64) DEFAULT '',
  status_notes text,
  supervisor_district int(32) DEFAULT NULL,
  human_address json DEFAULT NULL,
  needs_recoding tinyint(1) DEFAULT '0',
  responsible_agency varchar(256) DEFAULT NULL,
  neighborhood varchar(256) DEFAULT NULL,
  category varchar(128) DEFAULT NULL,
  updated timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status varchar(128) NOT NULL DEFAULT '',
  status_code tinyint(1) NOT NULL COMMENT 'open=1, closed=0',
  url text,
  PRIMARY KEY (case_id),
  KEY since (opened),
  KEY status (status_code),
  KEY i_category (category),
  SPATIAL KEY i_location (location)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;
  return db.raw(query);
};
