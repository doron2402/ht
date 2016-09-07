# ht

### Requirement
- Mysql
- Docker engine (v1.12.1)
- Node > 6.0.0
- NPM version 3.8.6

### How to start
#### With Docker
	- `docker-compose up`
#### without docker
	- start mysql and pass to the node app
	- clone the repo `git clone...` you know the rest
	- run `npm install`
	- `npm run lint` (Optional)
	- `npm test` - working progress
	- Set env variables:
		- `DB_HOST`
		- `DB_PORT`
		- `DB_USER`
		- `DB_PASSWORD`
		- `POST`
	- Run `npm start`

### Plugins (Node Modules)
- Joi
- Vision
- Mysql
- Swagger
- knex

### Routes
- [GET] /				: home
- [GET] /documentation  : Hapi Swagger
- [GET] /docs           : Routes documentation
- [GET] /heath			: Info
- [GET] /version		: Info
- [GET] /case/:id		: Get Case by id
- [GET] /cases			: Get multiple cases

### Todos
	-	Should have used Postgresql better features for geo location search
	-	turn on Babel and more async / await features - nice to have
	-	For more accurate results should have used The Haversine Formula in MySQL
	-	Unit tests
	- 	Integration test with the API
	-	Test the endpoints
	-	Test in general
### Important notes
	-	Why I'm using the number 111 to divide the radius:
	`In the Napoleonic era, the meter was first defined so there were ten million of them in the distance from the equator to one of the poles.
	So, the original number of meters in a degree of latitude was 10,000,000 / 90 or 111.111 km.
	However the earth bulges a little,
	so 111.045 km per degree is considered a better approximation.`
	- Great article: http://www.plumislandmedia.net/mysql/haversine-mysql-nearest-loc/

### Questions
	-	Twitter @segaldoron