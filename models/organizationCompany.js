const {Model, DataTypes} = require("sequelize");
const db = require("../utils/db");
const CompanyAccount = require("./companyAccount");

class OrganizationCompany extends Model {
	static associate(models) {
    OrganizationCompany.hasMany(models.conference, {
      as: 'conferences', foreignKey: 'organizationCompanyId'
    });
		OrganizationCompany.belongsTo(models.companyAccount, {
			foreignKey: 'accountId'
		})
	}
}

const options = {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'organizationCompanies'
}

const attributes = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING
	},
	logoPath: {
		type: DataTypes.STRING
	},
	contactPhone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    }
	},
	address: {
		type: DataTypes.STRING
	},
	accountId: {
		type: DataTypes.UUID,
		references: {
			model: CompanyAccount,
			key: 'id'
		}
	}
}

OrganizationCompany.init(attributes, options);

module.exports = OrganizationCompany;
