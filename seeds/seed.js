const sequelize = require("../config/connection");
const { User, Book, Shelf, Review } = require('../models')

const seed = async () => {
    const userData = await User.bulkCreate([
        {
        email:"meep@meep.com",
        password:"password"
    },
    {
        email:"test@test.com",
        password:"password"
    }],
    {
        individualHooks:true
    })

    const shelfData = await Shelf.bulkCreate([
        {
            name: "Faves",
            description: "All time favorite books",
            UserId:1,
        },
        {
            name: "TBR",
            description: "Desperately want to read these",
            UserId:2,
        },
        {
            name: "To Be Read",
            description: "Eeeep can't wait to read these!",
            UserId:1,
        },
        {
            name: "Upcoming Releases",
            description: "Counting Down the Days",
            UserId:1,
        },
        {
            name: "DNF",
            description: "Boo these books",
            UserId:1,
        },
        {
            name: "Best of All Time",
            description: "Classics that I love and you should too",
            UserId:2,
        },
    ])

    const bookData = await Book.bulkCreate([
        {
            title:"A Touch of Darkness",
            author:"Scarlett St. Clair",
            cover_img:"https://covers.openlibrary.org/b/olid/OL28946291M-M.jpg",
            pages:354,
            edition_key:"OL31995429M"
        },
        {
            title:"A Court of Wings and Ruin",
            author:"Sarah J. Maas",
            cover_img:"https://covers.openlibrary.org/b/olid/OL26832221M-M.jpg",
            pages:720,
            edition_key:"OL37072070M"
        },
        {
            title:"A Court of Thorns and Roses",
            author:"Sarah J. Maas",
            cover_img:"https://covers.openlibrary.org/b/olid/OL27099075M-M.jpg",
            pages:432,
            edition_key:"OL31959292M"
        },
        {
            title:"A Court of Mist and Fury",
            author:"Sarah J. Maas",
            cover_img:"https://covers.openlibrary.org/b/olid/OL26992991M-M.jpg",
            pages:640,
            edition_key:"OL32856480M"
        },
        {
            title:"House of Earth and Blood",
            author:"Sarah J. Maas",
            cover_img:"https://covers.openlibrary.org/b/olid/OL27924119M-M.jpg",
            pages:816,
            edition_key:"OL35866018M"
        },
        {
            title:"House of Sky and Breath",
            author:"Sarah J. Maas",
            cover_img:"https://covers.openlibrary.org/b/olid/OL28946291M-M.jpg",
            pages:807,
        },
        {
            title:"Empire of Storms",
            author:"Sarah J. Maas",
            cover_img:"https://covers.openlibrary.org/b/olid/OL26319926M-M.jpg",
            pages:712,
            edition_key:"OL27696715M"
        },
        {
            title:"The Ruin of Kings",
            author:"Jenn Lyons",
            cover_img:"https://covers.openlibrary.org/b/olid/OL27760114M-M.jpg",
            pages:576,
            edition_key:"OL29792696M"
        },
        {
            title:"The Memory of Souls",
            author:"Jenn Lyons",
            cover_img:"https://covers.openlibrary.org/b/olid/OL28178905M-M.jpg",
            pages:656,
            edition_key:"OL29831091M"
        },
        {
            title:"The Discord of Gods",
            author:"Jenn Lyons",
            cover_img:"https://covers.openlibrary.org/b/olid/OL34161957M-M.jpg",
            pages:512,
            edition_key:"OL37998226M"
        },
    ])

    await bookData[1].addShelf(0)
    await bookData[2].addShelf(0)
    await bookData[2].addShelf(2)
    await bookData[7].addShelf(5)
    await bookData[4].addShelf(3)
    await bookData[5].addShelf(3)
    await bookData[8].addShelf(1)
    await bookData[3].addShelf(4)
    await bookData[5].addShelf(0)

    const reviewData = await Review.bulkCreate([
        {
            read:true,
            date_started:"2022-03-22",
            date_finished:"2022-03-23",
            rating:5,
            review:"One of my favorite books of all time srsly",
            format:"Kindle",
            series:"Crescent City #1",
            BookId:4,
            UserId:1 
        },
        {
            read:true,
            date_started:"2022-04-22",
            date_finished:"2022-04-24",
            rating:3,
            review:"I enjoyed it but objectively a bad book",
            format:"Kindle",
            series:"Persephone x Hades #1",
            BookId:0,
            UserId:1 
        },
        {
            read:true,
            date_started:"2022-05-22",
            date_finished:"2022-05-25",
            rating:4,
            review:"Best book in this series in my opinion",
            format:"Kindle",
            series:"ACOTAR #2",
            BookId:1,
            UserId:2 
        },
        {
            read:false,
            BookId:8,
            UserId:2
        },
    ])
}

sequelize.sync({force:false}).then(()=>{
    seed();
})