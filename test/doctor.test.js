process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const Doctor = require('../models/doctor');
const { addDoctor, getDoctorById, truncateDoctorTable, addManyDoctors } = require('../repositories/doctorRepository');
const app = require('../app');
const should = chai.should();
const randomEmailGenerator = require('random-email');
const uuidGenerator = require('uuid');
const {destroy} = require('../models/doctor');

chai.use(chaiHttp);

const doctor = {
  id: '6f20b5af-657d-4b20-85a3-00807b81eb5b',
  firstName: "First",
  lastName: "Last",
  jobTitle: "Doctor",
  email: "mail@mail.com",
  university: "Everywhere",
  phone: "01211325591",
  placeOfWork: "Hospital",
  specialty: 1,
  scientificDegree: 1
}


const DUP_DOCTOR = {
  firstName: "First",
  lastName: "Last",
  jobTitle: "Doctor",
  email: "dupmail@mail.com",
  university: "Everywhere",
  phone: "01222222222",
  placeOfWork: "Hospital",
  specialty: 1,
  scientificDegree: 1
}


describe('Doctors', () => {
  before(async () => {
    suppressConsoleLogging();
    console.log('-----> Sync db...');
    await new Promise(resolve => setTimeout(resolve, 500));
		console.log('-----> Truncate doctor table');
		await truncateDoctorTable();
		console.log('-----> Seeding testing data');
		await addManyDoctors([doctor, DUP_DOCTOR]);
  });

  /**
   * GET
   */
  describe('/GET doctor', () => {
    it('It should return all doctors', async () => {
      const res = await chai.request(app).get('/dr');
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
        .get('/dr/' + doctor.id);
      return (
        res.should.have.status(200)
      );
    });
  });

  describe('/GET/:id doctor', () => {
    it('It should return not found resource', async () => {
      const res = await chai
        .request(app)
        .get('/dr/' + uuidGenerator.v4());
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
				.delete('/dr/' + doctor.id);
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
				.delete('/dr/' + uuidGenerator.v4());
				return (
					res.should.have.status(404) 
				);
			});
		});
});


const suppressConsoleLogging = () => {
  sinon.stub(console, 'log');
  sinon.stub(console, 'info');
  sinon.stub(console, 'warn');
  sinon.stub(console, 'error');
}
