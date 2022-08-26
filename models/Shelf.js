const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shelf extends Model { }

Shelf.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    },
    last_update: {
        type: DataTypes.DATE,
        allowNull:false,
    }
}, {
    timestamps: false,
    sequelize,
});

// fk references user_id 


module.exports = Shelf;