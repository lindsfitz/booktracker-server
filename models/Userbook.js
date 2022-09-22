const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Userbook extends Model { }

Userbook.init({
    shelved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    reading: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    owned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    dnf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize,
});

// fk references user_id 


module.exports = Userbook;