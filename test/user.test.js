const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const appRoot = require('app-root-path');
const fs = require('fs');

const { truncateDoctorTable, addManyDoctors } = require("../repositories/user.repository");
const app = require('../app');
const should = chai.should();
const randomEmailGenerator = require('random-email');
const uuidGenerator = require('uuid');
const { records } = require('./testingData');
const { generateJwtForLoggedInUser } = require('../utils/jwtGenerator');
const roles = require('../statics/roles');
const { userRoutes } = require('../statics/routes');
const getRouteWithoutParams = require('../helpers/getRouteWithoutParams');

chai.use(chaiHttp);

const USER = records[0];
const DUP_DOCTOR = records[1];

const JWT_TOKEN = generateJwtForLoggedInUser({
  id: uuidGenerator.v4(),
  role: roles.user
});

describe('Users', () => {
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
  describe('/GET user', () => {
    it('It should return all users', async () => {
      const res = await chai
        .request(app)
        .get(userRoutes.getAll);
      return (
        res.should.have.status(200) &&
        res.body.data.should.be.a('array')
      );
    });
  });

  /**
   * GET/:id
   */
  describe('/GET/:id user', () => {
    it('It should user return by id', async () => {
      const res = await chai
        .request(app)
        .get(getRouteWithoutParams(userRoutes.getById) + '/' + USER.id);
      return (
        res.should.have.status(200)
      );
    });
  });

  describe('/GET/:id user', () => {
    it('It should return not found resource', async () => {
      const res = await chai
        .request(app)
        .get(getRouteWithoutParams(userRoutes.getById) + '/' + uuidGenerator.v4());
      return (
        res.should.have.status(404) &&
        res.body.should.have.property('errors')
      );
    });
  });

  /**
   * POST/:id
   */

  let postUser = {
		id: uuidGenerator.v4(),
    fullName: "Mohab Alnajjar",
    email: randomEmailGenerator(),
    password: "mOhasbD123*&^",
    phone: Math.random().toString().slice(2, 13)
  };

  describe('/POST user', () => {
    it('It should add new user successfuly', async () => {
      const res = await chai
        .request(app)
        .post(userRoutes.post)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(postUser);
      return (
        res.should.have.status(201)
      );
    });
  });

  // // Invalid input data
  // describe('/POST user', () => {
  //   it('It should return invalid input data response', async () => {
  //     let newDr = JSON.parse(JSON.stringify(doctor));
  //     delete newDr.id;
  //     newDr.firstName = '123name';
  //     newDr.email = randomEmailGenerator();
  //     newDr.phone = Math.random().toString().slice(2, 13);
  //     const res = await chai
  //       .request(app)
  //       .post('/user')
  //       .set({ Authorization: `Bearer ${JWT_TOKEN}` })
  //       .send(newDr);
  //     return (
  //       res.should.have.status(400) &&
  //       res.body.should.have.property('errors')
  //     );
  //   });
  // });

  // Email already exists
  describe('/POST user', () => {
    it('It should return email already in use', async () => {
      const res = await chai
        .request(app)
        .post(userRoutes.post)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(postUser);
      return (
        res.should.have.status(400) &&
        res.body.should.have.property('errors') &&
        res.body.should.have.property('errors').eql('Email already in use')
      );
    });
  });

  // Phone number already exists
  describe('/POST user', () => {
    it('It should return phone number already in use', async () => {
      const res = await chai
        .request(app)
        .post(userRoutes.post)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(postUser);
      return (
        res.should.have.status(400) &&
        res.body.should.have.property('errors')
      );
    });
  });

  /**
   * PUT/:id
   */

	const putUser = {
		...postUser,
		palceOfWork: 'asdsdad',
		biography: 'sfdnsl',
		nationality: 'adssad',
		placeOfWork: 'sadasd',
		university: 1,
		specialty: 1,
		scientificDegree: 1
	}
  // OK
  describe('/PUT user', () => {
    it('It should update user successfuly', async () => {
			let userToPut = putUser;
			userToPut.fullName = 'fdsfdslfjdsaijfh';
      const res = await chai
        .request(app)
        .put(getRouteWithoutParams(userRoutes.put) + '/' + userToPut.id)
        .set({ Authorization: `Bearer ${JWT_TOKEN}` })
        .send(userToPut);
      return (
        res.should.have.status(200)
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
        .put('/user/' + doctor.id)
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
        .put('/user/' + doctor.id)
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
        .put('/user/' + newDr.id)
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
        .put('/user/' + uuidGenerator.v4())
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
        .delete('/user/' + doctor.id)
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
        .delete('/user/' + uuidGenerator.v4())
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(404)
      );
    });
  });

  /**
   * /PUT/ dr/:id/profile-img
   */
  describe('/user/:id/profile-img', () => {
    it('It should update doctor profile image successfuly', async () => {
      const res = await chai
        .request(app)
        .put('/user/' + DUP_DOCTOR.id + '/profile-img')
        .attach('userImg', __dirname + '/sample-image.jpg')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(200)
      );
    });
  });

  // Submit non image format
  describe('/user/:id/profile-img', () => {
    it("It shouldn't accept non image format", async () => {
      const res = await chai
        .request(app)
        .put('/user/' + DUP_DOCTOR.id + '/profile-img')
        .attach('userImg', __dirname + '/textFile.txt')
        .set({ Authorization: `Bearer ${JWT_TOKEN}` });
      return (
        res.should.have.status(400)
      );
    });
  });
});

