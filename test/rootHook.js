process.env.NODE_ENV = 'test';

const { before } = require("mocha");
const { truncateDoctorTable, addManyDoctors } = require("../repositories/doctorRepository");
const sinon = require('sinon');
const { records } = require("./testingData");

exports.mochaGlobalSetup = async function () {
  before(async () => {
    console.log('---------- Mocha Global Setup ----------');
    console.log('-----> Sync db...');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('-----> Truncate doctor table');
    await truncateDoctorTable();
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
