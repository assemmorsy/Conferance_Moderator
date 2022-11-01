const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const db = require('../utils/db');
const ScientificDegree = require("./scientificDegree.model");
const Specialty = require("./specialty.model");
const University = require("./university.model");

class User extends Model {
  static associate(models) {

    User.belongsTo(models.specialty, {
      foreignKey: 'specialtyId'
    });

    User.belongsTo(models.scientificDegree, {
      foreignKey: 'scientificDegreeId'
    });

    User.belongsTo(models.university, {
      foreignKey: 'universityId'
    });
  }
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'users'
}

const attributes = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('fullName', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      if (value) {
        hashedValue = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedValue);
      }
    }
  },

  imagePath: {
    type: DataTypes.STRING,
  },

  placeOfWork: {
    type: DataTypes.STRING
  },
  isDead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  biography: {
    type: DataTypes.STRING
  },
  nationality: {
    type: DataTypes.STRING,
  },
  scientificDegreeId: {
    type: DataTypes.INTEGER,
    references: {
      model: ScientificDegree,
      key: 'id'
    }
  },
  specialtyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Specialty,
      key: 'id'
    }
  },
  universityId: {
    type: DataTypes.INTEGER,
    references: {
      model: University,
      key: 'id'
    }
  }
}

User.init(attributes, options);

module.exports = User;
