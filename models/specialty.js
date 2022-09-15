const {Model, DataTypes} = require("sequelize");
const db = require("../utils/db");

class Specialty extends Model {
	static associate(models) {
		Specialty.hasMany(models.doctor, {
			as: 'doctors',
			foreignKey: 'specialtyId'
		});
	}
}

const attributes = {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}

const options = {
	sequelize: db.sequelize,
	timestamps: false,
	modelName: 'specialty'
}

Specialty.init(attributes, options);

module.exports = Specialty;
