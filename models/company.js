'use strict';

module.exports = function(sequelize , DataTypes){

const Company = sequelize.define('Company', {

        idCompany: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        SIREN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        zipCode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        paranoid: false,
        underscored: true,
        freezeTableName: true,

        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });
    Company.associate = (models) => {
        Company.hasMany(models.Advertisement, {
          foreignKey: 'idCompany',
          as: 'advertisements',
        });
        Company.hasMany(models.PasswordHistory, {
          foreignKey: 'idCompany',
          as: 'passwordHistorys',
        });
      };

    return Company;
};
