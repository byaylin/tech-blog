const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
    },
    post: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    sequelize
});

module.exports=Post