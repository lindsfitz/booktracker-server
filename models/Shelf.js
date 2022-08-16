const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shelf extends Model { }

Shelf.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize,
});


module.exports = Shelf;