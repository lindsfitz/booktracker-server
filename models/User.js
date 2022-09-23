const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model { }

User.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: [4]
        }
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    hooks: {
        beforeCreate(newUser) {
            newUser.password = bcrypt.hashSync(newUser.password, 5);
            return newUser;
        },
        beforeUpdate(updatedUser) {
            updatedUser.password = bcrypt.hashSync(updatedUser.password, 5);
            return updatedUser;
        }
    },
    sequelize,
});

module.exports = User;
