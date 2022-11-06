const {Model, DataTypes} = require("sequelize");
const db = require("../utils/db");

class Faculty extends Model {
	static associate(models) {
    Faculty.hasMany(models.conference, {
      as: 'users', foreignKey: 'organizationCompanyId'
    });
	}
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'faculties'
}

const attributes = {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	job: {
		type: DataTypes.STRING,
		allowNull: false
	}
}

Faculty.init(attributes, options);

module.exports = Faculty;
