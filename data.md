## Data
```javascript
[ {
  "address" : "Intersection of 26TH ST and TENNESSEE ST",
  "opened" : "2016-09-04T00:38:27",
  "source" : "Open311",
  "status_notes" : "Open",
  "media_url" : {
    "url" : "http://mobile311.sfgov.org/media/san_francisco/report/photos/57cbcf57df8605cb94d8bfa8/report.jpg"
  },
  "supervisor_district" : "10",
  "point" : {
    "latitude" : "37.7515022676729",
    "human_address" : "{\"address\":\"\",\"city\":\"\",\"state\":\"\",\"zip\":\"\"}",
    "needs_recoding" : false,
    "longitude" : "-122.38862909151"
  },
  "case_id" : "6273247",
  "responsible_agency" : "DPT Abandoned Vehicles Work Queue",
  "neighborhood" : "Central Waterfront",
  "category" : "Abandoned Vehicle",
  "updated" : "2016-09-04T00:38:27",
  "status" : "Open"
},
...
]

```

## Database

```sql

DROP TABLE IF EXISTS `cases`;

CREATE TABLE `cases` (
  `case_id` int(11) unsigned NOT NULL,
  `address` varchar(256) DEFAULT NULL,
  `opened` timestamp NULL DEFAULT NULL,
  `location` geometry NOT NULL,
  `source` varchar(32) DEFAULT '',
  `status_notes` varchar(32) DEFAULT NULL,
  `supervisor_district` int(11) DEFAULT NULL,
  `human_address` json DEFAULT NULL,
  `needs_recoding` tinyint(1) DEFAULT NULL,
  `responsible_agency` varchar(128) DEFAULT NULL,
  `neighborhood` varchar(128) DEFAULT NULL,
  `category` varchar(64) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(16) NOT NULL DEFAULT '',
  `status_code` tinyint(1) NOT NULL COMMENT 'open=1, closed=0',
  PRIMARY KEY (`case_id`),
  KEY `since` (`opened`),
  KEY `status` (`status_code`),
  KEY `i_category` (`category`),
  SPATIAL KEY `i_location` (`location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




```