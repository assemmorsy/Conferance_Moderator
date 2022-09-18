const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const db = require('../utils/db');
const ScientificDegree = require("./scientificDegree");
const Specialty = require("./specialty");

class Doctor extends Model {
  static associate(models) {
    Doctor.belongsTo(models.specialty, {
      foreignKey: 'specialtyId'
    });
    Doctor.belongsTo(models.scientificDegree, {
      foreignKey: 'scientificDegreeId'
    });
  }
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'doctors'
}

const attributes = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('firstName', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('lastName', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    }
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return $`{this.firstName} {this.lastName}`;
    },
    set() {
      throw new Error("don't try to set 'fullName' value")
    }
  },
  isRegistered: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.password !== null
    }, set(value) {
      throw new Error("don't try to set 'registered' value")
    }
  },
  jobTitle: {
    type: DataTypes.TEXT
  }
  ,
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`
    },
    set(value) {
      throw new Error("don't try to set 'fullname' value")
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
  university: {
    type: DataTypes.STRING,
    allowNull: false,
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
    set(value) {
      if (value) {
        hashedValue = bcrypt.hashSync(value, 10)
        this.setDataValue('password', hashedValue)
      }
    }
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  placeOfWork: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  }
}

Doctor.init(attributes, options);

module.exports = Doctor;
