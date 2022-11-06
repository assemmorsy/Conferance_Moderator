const associate = require("../models/associate");
const { DEV, TEST } = require("../statics/envs");
const dataSeeder = require("./dataSeeder");
const db = require("./db")
const dotenv = require('dotenv').config();

module.exports = async () => {
  try {
    await associate();
    await db.sequelize.authenticate();
    if ([DEV, TEST].includes(process.env.NODE_ENV)) {
      await db.sequelize.sync({ force: true });
    }
    await dataSeeder();
    return true;
  } catch (err) {
    console.log(err);
    db.sequelize.close();
    return false;
  }
}
