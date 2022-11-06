const {Model, DataTypes} = require("sequelize");
const db = require("../utils/db");

class CompanyAccount extends Model {
	static associate(models) {
		CompanyAccount.hasMany(models.organizationCompany, {
			as: 'organizationCompanies', foreignKey: 'accountId'	
		});
	}
}


const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'companyAccounts'
}

const attributes = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
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
	role: {
		type: DataTypes.STRING
	}
}

CompanyAccount.init(attributes, options);
module.exports = CompanyAccount;
