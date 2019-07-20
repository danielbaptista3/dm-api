'use strict';

module.exports = function(sequelize , DataTypes){

const User = sequelize.define('User', {

        idUser: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        zipCode:{
            type: DataTypes.STRING,
            allowNull: false
        },
        city:{
            type: DataTypes.STRING,
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
        freezeTableName: true
    });

    return User;
};
