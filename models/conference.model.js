const { Model, DataTypes } = require("sequelize");
const db = require("../utils/db");

class Conference extends Model {
  static associate(models) {

    Conference.belongsToMany(models.user, {
			through: models.user_conference
		});

		Conference.belongsToMany(models.specialty, {
			through: models.conference_specialty
		});
		
		Conference.belongsToMany(models.accommodationPlace, {
			through: models.conference_accommodation
		});
  }
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'conferences'
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
  posterImagePath: {
    type: DataTypes.STRING,
  },
  from: {
    type: DataTypes.DATEONLY
  },
  to: {
    type: DataTypes.DATEONLY
  },
  OBSPath: {
    type: DataTypes.STRING,
  },
  introLink: {
    type: DataTypes.STRING,
  },
  enrollmentEndDate: {
    type: DataTypes.DATE
  },
  mapLocationLink: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  holdInPlaceName: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  broshurePath: {
    type: DataTypes.STRING
  }
}

Conference.init(attributes, options);

module.exports = Conference;
