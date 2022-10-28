const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const { records } = require('./testingData');
const randomEmailGenerator = require('random-email');
const uuidGenerator = require('uuid');
const { generateJwtForEmailConfirmation, generateJwtForLoggedInUser } = require('../utils/jwtGenerator');
const {authRoutes} = require('../statics/routes');
const getRouteWithoutParams = require('../helpers/getRouteWithoutParams');

chai.use(chaiHttp);

const USER_OBJECT = {
  id: uuidGenerator.v4(),
  fullName: "First Last",
  email: "auth@mail.com",
  password: "moHAB876!@#$dsfHJG",
  phone: "07256548451"
};

describe('Authentication', () => {
  describe('Authentication for doctors', () => {
    /**
     * /auth/register-dr
     */
    // Register successfuly
    describe('/POST/ Register as user', () => {
      it("It should register new user successfuly and waiitng for user confirmation", async () => {
        const res = await chai
          .request(app)
          .post(authRoutes.userRegister)
          .send(USER_OBJECT);
        return (
          res.should.have.status(200)
        );
      });
    });

    // User already exists
    describe('/POST/ Register as user', () => {
      it("It shouldn't register same user", async () => {
        let newDr = JSON.parse(JSON.stringify(USER_OBJECT));
        newDr.id = uuidGenerator.v4();
        newDr.email = 'reg@mail.com';
        newDr.phone = '65123874951';
        newDr.password = '123';
        const res = await chai
          .request(app)
          .post(authRoutes.userRegister)
          .send(newDr);
        return (
          res.should.have.status(400) &&
          res.body.should.have.property('errors')
        );
      });
    });

    // Not provide password field 
    describe('/POST/ Register as user', () => {
      it("It shouldn't register user without a password", async () => {
        let newDr = JSON.parse(JSON.stringify(USER_OBJECT));
        delete newDr.password;
        const res = await chai
          .request(app)
          .post(authRoutes.userRegister)
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
        const token = generateJwtForEmailConfirmation({ id: USER_OBJECT.id, role: 'user' });
        const res = await chai
          .request(app)
          .get(getRouteWithoutParams(authRoutes.userEmailConfirmation) + '/' + token);
        return (
          res.should.have.status(200)
        );
      });
    });

    /**
   * /auth/login-dr
   */
    // OK
    describe('/POST/ Login as user', () => {
      it('It should login successfuly', async () => {
        const res = await chai
          .request(app)
          .post(authRoutes.userLogin)
          .send(USER_OBJECT);
        return (
          res.should.have.status(200) &&
          res.body.should.have.property('token')
        );
      });
    });

    // Incorrect email
    describe('/POST/ Login as user', () => {
      it("It shouldn't login with unexisting email", async () => {
        let newDr = JSON.parse(JSON.stringify(USER_OBJECT));
        newDr.email = randomEmailGenerator();
        const res = await chai
          .request(app)
          .post(authRoutes.userLogin)
          .send(newDr);
        return (
          res.should.have.status(401)
        );
      });
    });

    // Incorrect password
    describe('/POST/ Login as user', () => {
      it("It shouldn't login with uncorrect password", async () => {
        let newDr = JSON.parse(JSON.stringify(USER_OBJECT));
        newDr.password = 'Incorrectpassword';
        const res = await chai
          .request(app)
          .post(authRoutes.userLogin)
          .send(newDr);
        return (
          res.should.have.status(401)
        );
      });
    });
  });
});
