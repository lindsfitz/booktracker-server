const User = require('./User')
const Shelf = require('./Shelf')
const Book = require('./Book')
const Review = require('./Review')
const Request = require('./Request')
const Userbook = require('./Userbook')
const ActivityGoal = require('./ActivityGoal')
const Profile = require('./Profile')


User.hasOne(Profile, {
    onDelete: 'CASCADE'
});
Profile.belongsTo(User)

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



User.belongsToMany(Book, {through:'Shelved', as: 'OnShelf'})

User.belongsToMany(Book, {through:'CurrentlyReading', as: 'CurrentRead'})
Book.belongsToMany(User, {through:'CurrentlyReading', as: 'CurrentBooks'})

User.belongsToMany(Book, {through:'NotFinished', as: 'DNF'})
Book.belongsToMany(User, {through:'NotFinished', as: 'DNFBooks'})

User.belongsToMany(Book, {through:'OwnedItems', as: 'Owned'})
Book.belongsToMany(User, {through:'OwnedItems', as: 'OwnedBooks'})






ActivityGoal.belongsTo(User)
User.hasMany(ActivityGoal)



// Friends lists functionality being added potentially 
User.belongsToMany(User, { as: 'Sender', through: 'Friends' });
User.belongsToMany(User, { as: 'Receiver', through: 'Friends' });
// Request.belongsTo(User, {
//     foreignKey:'senderId'
// })
// User.belongsToMany(User, {through: Request, as:'Sender'})
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
    Profile,
    Userbook,
    ActivityGoal
}