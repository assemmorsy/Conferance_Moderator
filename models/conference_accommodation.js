const {Model, DataTypes} = require("sequelize");
const db = require("../utils/db");

class Conference_accommodation extends Model {
	static associate(models) {

	}
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'conference_accommodation'
}

const attributes = {
	conferenceId: {
		type: DataTypes.UUID,
		primaryKey: true
	},
	accommodationPlaceId: {
		type: DataTypes.UUID,
		primaryKey: true
	}
}

Conference_accommodation.init(attributes, options);

module.exports = Conference_accommodation;
