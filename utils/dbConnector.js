const associate = require("../models/associate");
const dataSeeder = require("./dataSeeder");
const db = require("./db")

module.exports = async () => {
	try {
		await db.sequelize.authenticate();
		await db.sequelize.sync({ logging: console.log, alert: true });
		await	associate();
		await	dataSeeder();
		return true;
	} catch (err) {
    console.log(err);
    db.sequelize.close();
		return false;
	}
}
