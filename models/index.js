const User = require('./User')
const Shelf = require('./Shelf')
const Book = require('./Book')
const Review = require('./Review')
const Request = require('./Request')
const Userbook = require('./Userbook')
const ActivityGoal = require('./ActivityGoal')


// Shelf belongs to User
// User has many Shelf
    // fk user id in Shelf table

Shelf.belongsTo(User);
User.hasMany(Shelf, {
    onDelete: 'CASCADE'
})

// Book belongs to many Shelf
// Shelf has many Book
    // THROUGH: bookshelf 

Book.belongsToMany(Shelf,{through: 'bookshelf'})
Shelf.belongsToMany(Book, {through: 'bookshelf'})

// Review belongs to User
// User has many Review
    // fk user id in Review table

Review.belongsTo(User)
User.hasMany(Review, {
    onDelete: 'CASCADE'
})


Review.belongsTo(Book)
Book.hasMany(Review)


User.belongsToMany(Book, {through:'CurrentlyReading'})
Book.belongsToMany(User, {through:'CurrentlyReading'})


User.belongsToMany(Book, {through: Userbook })
Book.belongsToMany(User, {through: Userbook })

ActivityGoal.belongsTo(User)
User.hasMany(ActivityGoal)



// Friends lists functionality being added potentially 
User.belongsToMany(User, { as: 'Sender', foreignKey: 'SenderUserId', through: 'Friends' });
User.belongsToMany(User, { as: 'Receiver', foreignKey: 'ReceiverUserId', through: 'Friends' });
// Request.belongsTo(User, {
//     foreignKey:'senderId'
// })

Request.belongsTo(User,{
    foreignKey:'SenderId'
})
// User.hasMany(Request)

Request.belongsTo(User,{
    foreignKey:'ReceiverId'
})
// User.hasMany(Request)


module.exports = {
    User,
    Book,
    Shelf,
    Review,
    Request,
    Userbook,
    ActivityGoal
}