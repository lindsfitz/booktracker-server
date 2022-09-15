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
    author_key: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    cover_img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pages: {
        type: DataTypes.INTEGER,
    },
    published: {
        type: DataTypes.INTEGER,
    },
    ol_key: {
        type: DataTypes.STRING,
    },
    isbn: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    sequelize,
});


module.exports = Book;