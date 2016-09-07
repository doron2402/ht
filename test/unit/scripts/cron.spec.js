const Code = require('code');
const Lab = require('lab');
const parser = require('cron-parser');
const moment = require('moment');
const settings = require('../../../server/settings');
const Cron = require('../../../scripts/cron');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Cron Job', () => {
  describe('parseLocation', () => {
    describe('When point is undefined', () => {
      it('Should return Bora Bora location', (done) => {
        const res = Cron.parseLocation(undefined);
        expect(res).to.equal("ST_GeomFromText(''POINT(-151.7414904 -16.5004)'')END_ST_GeomFromText");
        done();
      });
    });
    describe('When lat and long are defined', () => {
      it('Should return string', (done) => {
        const res = Cron.parseLocation({ longitude: 50.50501, latitude: 60.60601 });
        expect(res).to.equal("ST_GeomFromText(''POINT(50.50501 60.60601)'')END_ST_GeomFromText");
        done();
      });
    });
  });

  describe('Validate cron pattern', () => {
    it('Should not return an error', (done) => {
      const options = {
        currentDate: moment.utc().format(),
        endDate: moment(moment.utc().format()).add('1', 'weeks').toDate(),
        iterator: true
      };
      const interval = parser.parseExpression(settings.cronPattern, options);
      let obj = interval.next();
      const dateBefore = obj.value.toString().split(' ');
      obj = interval.next();
      const dateAfter = obj.value.toString().split(' ');
      expect(parseInt(dateBefore[2], 10) + 1)
        .to
        .equal(parseInt(dateAfter[2], 10));
      expect(dateBefore[4]).to.equal('00:00:00');
      expect(dateAfter[4]).to.equal('00:00:00');
      done();
    });
  });
});
