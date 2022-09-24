const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model { }

Profile.init({
    username: {
        type: DataTypes.STRING,
    },
    about_me: {
        type: DataTypes.TEXT,
    },
    display_name: {
        type: DataTypes.STRING
    },
    profile_picture: {
        type: DataTypes.STRING
    },
    favorite_shelf: {
        type: DataTypes.INTEGER
    },
    last_login: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false,
    sequelize,
})

module.exports = Profile;