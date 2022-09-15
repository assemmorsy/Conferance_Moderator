const {Model, DataTypes} = require("sequelize");
const db = require("../utils/db");

class ScientificDegree extends Model {
	static associate(models) {
		ScientificDegree.hasMany(models.doctor, {
			as: 'doctors', foreignKey: 'scientificDegreeId'
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
	modelName: 'scientificDegree'
}

ScientificDegree.init(attributes, options);

module.exports = ScientificDegree;
