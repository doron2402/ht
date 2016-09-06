# ht

### Requirement
- Mysql
- Docker engine (v1.12.1)
- Node > 6.0.0
- NPM version 3.8.6

### How to start
- clone the project `git clone..`
- run npm install `npm i`
- start the server `npm start`

### Plugins
- Joi
- Vision
- Mysql
- Swagger

### Routes
- [GET] /				: home
- [GET] /documentation  : Hapi Swagger
- [GET] /docs           : Routes documentation
- [GET] /heath			: Info
- [GET] /version		: Info
- [GET] /case/:id		: Get Case by id
- [GET] /cases			: Get multiple cases


### Todos
	-	Docker configuration
	-	Should have used postgresql better features
	-	turn on Babel and more async / await features - nice to have
	-	For more accurate results should have used The Haversine Formula in MySQL
	-	Unit tests
	- 	Integration test with the API
	-	Test in general