const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Request extends Model { }

Request.init({
    accepted:{
        type:DataTypes.BOOLEAN
    }
}, {
    timestamps: false,
    sequelize,
});

// fk references user_id 


module.exports = Request;