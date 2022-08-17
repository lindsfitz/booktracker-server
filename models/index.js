const User = require('./User')
const Shelf = require('./Shelf')
const Book = require('./Book')
const Review = require('./Review')


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
// Shelf.hasMany(Book, {through: 'bookshelf'})

// Review belongs to User
// User has many Review
    // fk user id in Review table

Review.belongsTo(User)
User.hasMany(Review, {
    onDelete: 'CASCADE'
})

// Review belongs to Book
// Book has many Review
    // fk book id in Review table

Review.belongsTo(Book)
Book.hasMany(Review)

module.exports = {
    User,
    Book,
    Shelf,
    Review
}