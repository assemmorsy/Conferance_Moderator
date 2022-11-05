const {Model, DataTypes} = require("sequelize");
const db = require("../utils/db");

class ConferenceSpecialty extends Model {
	static associate(models) {

	}
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'conference_specialty'
}

const attributes = {
	conferenceId: {
    type: DataTypes.UUIDV4,
    primaryKey: true
	}, 
	specialtyId: {
    type: DataTypes.INTEGER,
    primaryKey: true
	}
};


ConferenceSpecialty.init(attributes, options);

module.exports = ConferenceSpecialty;
