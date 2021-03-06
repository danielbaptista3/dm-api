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

    User.associate = (models) => {
        User.hasMany(models.Removal, {
          foreignKey: 'idUser',
          as: 'removals',
        });
        User.hasMany(models.Comment, {
          foreignKey: 'idUser',
          as: 'comments',
        });
      };


      
    return User;
};
