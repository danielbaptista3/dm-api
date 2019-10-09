'use strict';

module.exports = function(sequelize , DataTypes){

const Comment = sequelize.define('Comment', {

        idComment: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edited: {
             type: DataTypes.BOOLEAN,
             allowNull: false
         }
    },
    {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
          foreignKey: 'idUser',
          onDelete: 'CASCADE',
        });
        Comment.belongsTo(models.Removal, {
          foreignKey: 'idRemoval',
          onDelete: 'CASCADE',
        });      };

    return Comment;
};
