'use strict';

module.exports = function(sequelize , DataTypes){

const PasswordHistory = sequelize.define('PasswordHistory', {

        idPasswordHistory: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        oldPassword: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });

    PasswordHistory.associate = (models) => {
        PasswordHistory.belongsTo(models.User, {
          foreignKey: 'idUser',
          onDelete: 'CASCADE',
        });
        PasswordHistory.belongsTo(models.Company, {
          foreignKey: 'idCompany',
          onDelete: 'CASCADE',
        });
     };

    return PasswordHistory;
};
