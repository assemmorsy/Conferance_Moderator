process.env.NODE_ENV = 'test';

const { before } = require("mocha");
const { truncateDoctorTable, addManyDoctors } = require("../repositories/doctor.repository");
const sinon = require('sinon');
const { records } = require("./testingData");
const { truncatePendedDoctorTable } = require("../repositories/pendedDoctor.repository");

exports.mochaGlobalSetup = async function () {
  before(async () => {
    console.log('---------- Mocha Global Setup ----------');
    console.log('-----> Sync db...');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('-----> Truncate tables');
    await truncateDoctorTable();
    await truncatePendedDoctorTable();
    console.log('-----> Seeding testing data');
    await addManyDoctors(records);
    console.log('---------- Finish Global Setup ----------');
    suppressConsoleLogging();
  });
};

const suppressConsoleLogging = () => {
  sinon.stub(console, 'log');
  sinon.stub(console, 'info');
  sinon.stub(console, 'warn');
  sinon.stub(console, 'error');
}
