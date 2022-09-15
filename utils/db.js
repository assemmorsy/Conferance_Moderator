const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const db = {};

const config = require(__dirname + './../config/config.json')[process.env.STATUS];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;