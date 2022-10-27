const { Model, DataTypes } = require("sequelize");
const db = require("../utils/db");

class University extends Model {
  static associate(models) {
    University.hasMany(models.user, {
      as: 'users', foreignKey: 'universityId'
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
  modelName: 'universities'
}

University.init(attributes, options);

module.exports = University;
