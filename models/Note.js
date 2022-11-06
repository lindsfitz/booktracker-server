const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model { }

Note.init({
    content: {
        type: DataTypes.TEXT,
    },
    progress: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
});

module.exports = Note;