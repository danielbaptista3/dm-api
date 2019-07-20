'use strict';

module.exports = function(sequelize , DataTypes){

const Removal = sequelize.define('Removal', {

        idRemoval: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        arrivalAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });

    return Removal;
};
