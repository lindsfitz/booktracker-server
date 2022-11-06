const sequelize = require("../config/connection");
const { User, Book, Shelf, Review, ActivityGoal, Tag, Profile, Note } = require('../models');



const dropTables = async () => { 
    
    sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await sequelize.drop() 
    sequelize.query("SET FOREIGN_KEY_CHECKS = 1")

}


dropTables()