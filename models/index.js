const User = require('./User')
const Shelf = require('./Shelf')
const Book = require('./Book')
const Tag = require('./Tag')
const Review = require('./Review')
const Request = require('./Request')
const ActivityGoal = require('./ActivityGoal')
const Profile = require('./Profile')


User.hasOne(Profile, {
    onDelete: 'CASCADE'
});
Profile.belongsTo(User)



Shelf.belongsTo(User);
User.hasMany(Shelf, {
    onDelete: 'CASCADE'
})


ActivityGoal.belongsTo(User)
User.hasMany(ActivityGoal)



Book.belongsToMany(Shelf,{through: 'bookshelf'})
Shelf.belongsToMany(Book, {through: 'bookshelf'})



Review.belongsTo(User)
User.hasMany(Review, {
    onDelete: 'CASCADE'
})

Review.belongsTo(Book)
Book.hasMany(Review)



User.belongsToMany(Book, {through:'CurrentlyReading', as: 'CurrentRead'})
Book.belongsToMany(User, {through:'CurrentlyReading', as: 'CurrentBooks'})

User.belongsToMany(Book, {through:'NotFinished', as: 'DNF'})
Book.belongsToMany(User, {through:'NotFinished', as: 'DNFBooks'})

User.belongsToMany(Book, {through:'OwnedItems', as: 'Owned'})
Book.belongsToMany(User, {through:'OwnedItems', as: 'OwnedBooks'})

User.belongsToMany(Book, {through:'MarkedRead', as: 'Read'})
Book.belongsToMany(User, {through:'MarkedRead', as: 'ReadBooks'})


Profile.belongsToMany(Tag, {through:'UserTags'})
Tag.belongsToMany(Profile, {through:'UserTags'})

Book.belongsToMany(Tag, {through:'BookTag'})
Tag.belongsToMany(Book,{through:'BookTag'})

Shelf.belongsToMany(Tag, {through:'ShelfTags'})
Tag.belongsToMany(Shelf, {through:'ShelfTags'})







// Friends lists functionality being added potentially 
User.belongsToMany(User, { as: 'Friend1', through: 'Friends' });
User.belongsToMany(User, { as: 'Friend2', through: 'Friends' });


User.belongsToMany(User, {as: 'Sender', through:'Requests'})
User.belongsToMany(User, {as: 'Receiver', through:'Requests'})

// Request.belongsTo(User,{
//     foreignKey:'SenderId'
// })


// Request.belongsTo(User,{
//     foreignKey:'ReceiverId'
// })
// User.hasMany(Request)


module.exports = {
    Tag,
    User,
    Book,
    Shelf,
    Review,
    Request,
    Profile,
    ActivityGoal
}