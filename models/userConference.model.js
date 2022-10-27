const { Model, DataTypes } = require("sequelize");
const db = require("../utils/db");
const Conference = require("./conference.model");
const Doctor = require("./user.model");

class UserConference extends Model {
	static associate(models) {}
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'user_conference'
};

const attributes = {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: Doctor,
      key: 'id'
    }
  },
  conferenceId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: Conference,
      key: 'id'
    }
  },
  enrollAt: {
    type: DataTypes.DATEONLY
  },
  attendAt: {
    type: DataTypes.DATEONLY
  },
  certifiedAt: {
    type: DataTypes.DATEONLY
  }
}

UserConference.init(attributes, options);

module.exports = UserConference;
