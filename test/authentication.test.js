const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const { records } = require('./testingData');
const randomEmailGenerator = require('random-email');
const uuidGenerator = require('uuid');
const {generateJwtForEmailConfirmation, generateJwtForLoggedInUser} = require('../utils/jwtGenerator');

chai.use(chaiHttp);

const AUTH_DOC = records[2];
const USER_WITHOUT_PASS = records[1];
let NEW_ID_FOR_REG = '';

describe('Authentication', () => {
  describe('Authentication for doctors', () => {
    /**
     * /auth/login-dr
     */
    // OK
    describe('/POST/ Login as doctor', () => {
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
    describe('/POST/ Login as doctor', () => {
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
    describe('/POST/ Login as doctor', () => {
      it("It shouldn't login with uncorrect password", async () => {
        let newDr = JSON.parse(JSON.stringify(AUTH_DOC));
        newDr.password = 'Incorrectpassword';
        const res = await chai
          .request(app)
          .post('/auth/login-dr')
          .send(newDr);
        return (
          res.should.have.status(401)
        );
      });
    });

    /**
     * /auth/register-dr
     */
    
			// Register successfuly
    describe('/POST/ Register as doctor', () => {
      it("It should register new user successfuly and waiitng for user confirmation", async () => {
        let newDr = JSON.parse(JSON.stringify(AUTH_DOC));
				NEW_ID_FOR_REG = uuidGenerator.v4();
				newDr.id = NEW_ID_FOR_REG;
				newDr.email = 'reg@mail.com';
        newDr.phone = '65123874951';
        const res = await chai
          .request(app)
          .post('/auth/register-dr')
          .send(newDr);
        return (
          res.should.have.status(200)
        );
      });
    });

			// Register successfuly
    describe('/POST/ Register as doctor', () => {
      it("It should register exisitng user with data successfuly and waiitng for user confirmation", async () => {
        let newDr = JSON.parse(JSON.stringify(USER_WITHOUT_PASS));
				newDr.password = 'Kgy687VHj78676';
        const res = await chai
          .request(app)
          .post('/auth/register-dr')
          .send(newDr);
        return (
          res.should.have.status(200)
        );
      });
    });
			// User already exists
    describe('/POST/ Register as doctor', () => {
      it("It shouldn't register same user", async () => {
        let newDr = JSON.parse(JSON.stringify(AUTH_DOC));
				newDr.id = uuidGenerator.v4();
				newDr.email = 'reg@mail.com';
        newDr.phone = '65123874951';
				newDr.password = '123';
        const res = await chai
          .request(app)
          .post('/auth/register-dr')
          .send(newDr);
        return (
          res.should.have.status(400) &&
          res.body.should.have.property('errors')
        );
      });
    });

		// Not provide password field 
    describe('/POST/ Register as doctor', () => {
      it("It shouldn't register user without a password", async () => {
        let newDr = JSON.parse(JSON.stringify(AUTH_DOC));
				delete newDr.password;
        const res = await chai
          .request(app)
          .post('/auth/register-dr')
          .send(newDr);
        return (
          res.should.have.status(400) &&
          res.body.should.have.property('errors')
        );
      });
    });
		
    /**
     * /auth/confirm/:id
     */
    describe('/GET/ confirm an account', () => {
      it("It should confirm new user with email successfuly and complete registeration", async () => {
				const token = generateJwtForEmailConfirmation({id: NEW_ID_FOR_REG, role: 'user'});
        const res = await chai
          .request(app)
          .get('/auth/confirm/' + token);
        return (
          res.should.have.status(200) &&
          res.body.should.have.property('token')
        );
      });
    });

    describe('/GET/ confirm an account with exisitng data', () => {
      it("It should confirm exisitng user with email successfuly and complete registeration", async () => {
				const token = generateJwtForEmailConfirmation({id: USER_WITHOUT_PASS.id, role: 'user'});
        const res = await chai
          .request(app)
          .get('/auth/confirm/' + token);
        return (
          res.should.have.status(200) &&
          res.body.should.have.property('token')
        );
      });
    });
  });
});
