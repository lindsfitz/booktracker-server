const sequelize = require("../config/connection");
const { User, Book, Shelf, Review, ActivityGoal, Tag, Profile, Note } = require('../models');



const dropTables = async () => { await sequelize.drop() }


dropTables()