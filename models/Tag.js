const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model { }

Tag.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize,
});

// fk references user_id 


module.exports = Tag;