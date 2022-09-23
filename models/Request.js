const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Request extends Model { }

Request.init({
    accepted:{
        type:DataTypes.BOOLEAN
    }
}, {
    sequelize,
});


module.exports = Request;