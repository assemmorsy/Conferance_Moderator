process.env.NODE_ENV = 'test';

const { before } = require("mocha");
const { addManyUsers, truncateUserTable } = require("../repositories/user.repository");
const sinon = require('sinon');
const { records } = require("./testingData");
const { truncatePendedUserTable } = require("../repositories/pendedUser.repository");

exports.mochaGlobalSetup = async function () {
  before(async () => {
    console.log('---------- Mocha Global Setup ----------');
    console.log('-----> Sync db...');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('-----> Truncating');
    await truncateUserTable();
    await truncatePendedUserTable();
    console.log('-----> Seeding testing data');
    await addManyUsers(records);
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
