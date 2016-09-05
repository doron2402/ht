var Pool = require('pg').Pool;
var pool = new Pool({
  user: 'mydb_admin',
  password: 'password',
  host: 'localhost',
  database: 'hotel_tonight',
  max: 10, // max number of clients in pool
  idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
});

pool.on('error', function(e, client) {
  // if a client is idle in the pool
  // and receives an error - for example when your PostgreSQL server restarts
  // the pool will catch the error & let you handle it here
});

// you can run queries directly against the pool
pool.query('SELECT $1::text as name', ['foo'], function(err, result) {
	if (result && result.rows){
		 console.log(result.rows[0].name); // output: foo
	  } else {
		  console.log('result');
		  console.log(result);
	  }
});

// the query object implements the promise API
pool.query('SELECT $1::text as name', ['foo'])
  .then((res) => {
	  if (res.rows){
		  console.log(res.rows[0].name);
	  } else {
		  console.log('res');
		  console.log(res);
	  }

  }); // output: foo

// the pool also supports checking out a client for
// multiple operations, such as a transaction

pool.connect(function(err, client, release) {
  // TODO - you'll want to handle the error in real code
  try {
	  client.query('SELECT $1::text as name', ['foo'], function(err, result) {
		// you MUST return your client back to the pool when you're done!
		console.log(result.rows[0].name); // output: foo
	});
  } catch (error) {
	  console.error(error);
  }

});
