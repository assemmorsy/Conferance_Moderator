const {Model, DataTypes} = require("sequelize");
const db = require("../utils/db");


class AccommodationPlace extends Model {
	static associate(models) {

		AccommodationPlace.belongsToMany(models.conference, {
			through: models.conference_accommodation
		});
	}
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'accommodationPlaces'
}

const attributes = {
	id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
	},
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
	address: {
    type: DataTypes.STRING,
    allowNull: false
	}
}

AccommodationPlace.init(attributes, options);

module.exports = AccommodationPlace;
