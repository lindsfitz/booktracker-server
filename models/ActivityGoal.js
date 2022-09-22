const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ActivityGoal extends Model { }

ActivityGoal.init({
    month: {
        type: DataTypes.INTEGER,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize,
});

// fk references user_id 


module.exports = ActivityGoal;