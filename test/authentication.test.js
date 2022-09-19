const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const jwtGenerator = require('../utils/jwtGenerator');
const { records } = require('./testingData');
const randomEmailGenerator = require('random-email');

chai.use(chaiHttp);

const AUTH_DOC = records[2];

describe('Authentication', () => {
  describe('Authentication for doctors', () => {
    /**
     * /auth/login-dr
     */

    // OK
    describe('/auth/login-dr', () => {
      it('It should login successfuly', async () => {
        const res = await chai
          .request(app)
          .post('/auth/login-dr')
          .send(AUTH_DOC);
        return (
          res.should.have.status(200) &&
          res.body.should.have.property('token')
        );
      });
    });

    // Incorrect email
    describe('/auth/login-dr', () => {
      it("It shouldn't login with unexisting email", async () => {
        let newDr = JSON.parse(JSON.stringify(AUTH_DOC));
        newDr.email = randomEmailGenerator();
        const res = await chai
          .request(app)
          .post('/auth/login-dr')
          .send(newDr);
        return (
          res.should.have.status(401)
        );
      });
    });

    // Incorrect password
    describe('/auth/login-dr', () => {
      it("It shouldn't login with unexisting email", async () => {
        let newDr = JSON.parse(JSON.stringify(AUTH_DOC));
        newDr.password = Math.random().toString().slice(2);
        const res = await chai
          .request(app)
          .post('/auth/login-dr')
          .send(newDr);
        return (
          res.should.have.status(401)
        );
      });
    });

  });
});