const sequelize = require("../config/connection");
const { User, Book, Shelf, Review, ActivityGoal, Tag, Profile, Note } = require('../models');

await sequelize.drop()