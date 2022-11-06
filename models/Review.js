const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model { }

Review.init({
    public:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false,
    },
    date_started: {
        type: DataTypes.DATEONLY,   
    },
    date_finished: {
        type: DataTypes.DATEONLY, 
    },
    year_finished: {
        type: DataTypes.INTEGER
    },
    month_finished:{
        type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    review: {
        type: DataTypes.TEXT,
    },
    format: {
        type: DataTypes.STRING,
    },
    series: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
});

module.exports = Review;