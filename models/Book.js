const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model { }

Book.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author_gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cover_img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pages: {
        type: DataTypes.STRING,
    },
    edition_key: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    sequelize,
});


module.exports = Book;