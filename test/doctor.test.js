const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const appRoot = require('app-root-path');
const fs = require('fs');

const { truncateDoctorTable, addManyDoctors } = require("../repositories/doctor.repository");


const Doctor = require('../models/user.model');
const app = require('../app');
const should = chai.should();
const randomEmailGenerator = require('random-email');
const uuidGenerator = require('uuid');
const { records } = require('./testingData');
const { generateJwtForLoggedInUser } = require('../utils/jwtGenerator');

chai.use(chaiHttp);

const doctor = records[0];
const DUP_DOCTOR = records[1];

const JWT_TOKEN = generateJwtForLoggedInUser({
  id: doctor.id,
  role: 'user'
});

describe('Doctors', () => {

  after(() => {
    const imagesPath = appRoot + '/images/doctors-profiles';
    try {
      const files = fs.readdirSync(imagesPath)
      files.forEach(file => {
        if (file.split('.')[0] === 'test-sample') {

        }
      })
    } catch (err) {
      console.log(err)
    }
  });


  /**
   * GET
   */
  describe('/GET doctor', () => {
    it('It should return all doctors', async () => {
      const res = await chai
        .request(app)
        .get('/dr')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(200) &&
        res.body.data.should.be.a('array')
      );
    });
  });

  /**
   * GET/:id
   */
  describe('/GET/:id doctor', () => {
    it('It should return by id doctor', async () => {
      const res = await chai
        .request(app)
        .get('/dr/' + doctor.id)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(200)
      );
    });
  });

  describe('/GET/:id doctor', () => {
    it('It should return not found resource', async () => {
      const res = await chai
        .request(app)
        .get('/dr/' + uuidGenerator.v4())
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(404) &&
        res.body.should.have.property('errors')
      );
    });
  });

  /**
   * POST/:id
   */
  describe('/POST doctor', () => {
    it('It should add new doctor successfuly', async () => {
      let newDr = JSON.parse(JSON.stringify(doctor));
      delete newDr.id;
      newDr.email = randomEmailGenerator();
      newDr.phone = Math.random().toString().slice(2, 13);
      const res = await chai
        .request(app)
        .post('/dr')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(newDr);
      return (
        res.should.have.status(201)
      );
    });
  });

  // Invalid input data
  describe('/POST doctor', () => {
    it('It should return invalid input data response', async () => {
      let newDr = JSON.parse(JSON.stringify(doctor));
      delete newDr.id;
      newDr.firstName = '123name';
      newDr.email = randomEmailGenerator();
      newDr.phone = Math.random().toString().slice(2, 13);
      const res = await chai
        .request(app)
        .post('/dr')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(newDr);
      return (
        res.should.have.status(400) &&
        res.body.should.have.property('errors')
      );
    });
  });

  // Email already exists
  describe('/POST doctor', () => {
    it('It should return email already in use', async () => {
      const res = await chai
        .request(app)
        .post('/dr')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(doctor);
      return (
        res.should.have.status(400) &&
        res.body.should.have.property('errors') &&
        res.body.should.have.property('errors').eql('Email already in use')
      );
    });
  });


  // Phone number already exists
  describe('/POST doctor', () => {
    it('It should return phone number already in use', async () => {
      let newDr = JSON.parse(JSON.stringify(doctor));
      newDr.email = randomEmailGenerator();
      const res = await chai
        .request(app)
        .post('/dr')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(newDr);
      return (
        res.should.have.status(400) &&
        res.body.should.have.property('errors') &&
        res.body.should.have.property('errors').eql('Phone number already in use')
      );
    });
  });

  /**
   * PUT/:id
   */

  // OK
  describe('/PUT doctor', () => {
    it('It should update doctor successfuly', async () => {
      let newDr = JSON.parse(JSON.stringify(doctor));
      newDr.firstName = 'updated';
      const res = await chai
        .request(app)
        .put('/dr/' + doctor.id)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(newDr);
      return (
        res.should.have.status(200) &&
        res.body.should.have.property('message').eql('Resource updated successfuly')
      );
    });
  });

  // Invalid input data
  describe('/PUT doctor', () => {
    it('It should return invalid input data response', async () => {
      let newDr = JSON.parse(JSON.stringify(doctor));
      newDr.firstName = '123name';
      newDr.email = randomEmailGenerator();
      newDr.phone = Math.random().toString().slice(2, 13);
      const res = await chai
        .request(app)
        .put('/dr/' + doctor.id)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(newDr);
      return (
        res.should.have.status(400) &&
        res.body.should.have.property('errors')
      );
    });
  });

  // Email already exists
  describe('/PUT doctor', () => {
    it('It should return email already in use', async () => {
      let newDr = JSON.parse(JSON.stringify(doctor));
      newDr.email = DUP_DOCTOR.email;
      const res = await chai
        .request(app)
        .put('/dr/' + doctor.id)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(newDr);
      return (
        res.should.have.status(400) &&
        res.body.should.have.property('errors') &&
        res.body.should.have.property('errors').eql('Email already in use')
      );
    });
  });


  // Phone number already exists
  describe('/PUT doctor', () => {
    it('It should return phone number already in use', async () => {
      let newDr = JSON.parse(JSON.stringify(doctor));
      newDr.email = randomEmailGenerator();
      newDr.phone = DUP_DOCTOR.phone;
      const res = await chai
        .request(app)
        .put('/dr/' + newDr.id)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(newDr);
      return (
        res.should.have.status(400) &&
        res.body.should.have.property('errors') &&
        res.body.should.have.property('errors').eql('Phone number already in use')
      );
    });
  });

  // not found resource
  describe('/PUT/:id doctor', () => {
    it('it should return not found docotr', async () => {
      const res = await chai
        .request(app)
        .put('/dr/' + uuidGenerator.v4())
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(doctor);
      return (
        res.should.have.status(404)
      );
    });
  });

  /**
   * DELETE/:id
   */
  describe('/Delete/:id doctor', () => {
    it('It should delete a doctor by id successfuly', async () => {
      const res = await chai
        .request(app)
        .delete('/dr/' + doctor.id)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(200) &&
        res.body.should.have.property('message').eql('Resource deleted successfuly')
      );
    });
  });

  // not found resource
  describe('/delete/:id doctor', () => {
    it('it should return not found docotr', async () => {
      const res = await chai
        .request(app)
        .delete('/dr/' + uuidGenerator.v4())
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(404)
      );
    });
  });

  /**
   * /PUT/ dr/:id/profile-img
   */
  describe('/dr/:id/profile-img', () => {
    it('It should update doctor profile image successfuly', async () => {
      const res = await chai
        .request(app)
        .put('/dr/' + DUP_DOCTOR.id + '/profile-img')
        .attach('userImg', __dirname + '/sample-image.jpg')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(200)
      );
    });
  });

  // Submit non image format
  describe('/dr/:id/profile-img', () => {
    it("It shouldn't accept non image format", async () => {
      const res = await chai
        .request(app)
        .put('/dr/' + DUP_DOCTOR.id + '/profile-img')
        .attach('userImg', __dirname + '/textFile.txt')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(400)
      );
    });
  });
});

