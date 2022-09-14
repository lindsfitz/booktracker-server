const sequelize = require("../config/connection");
const { User, Book, Shelf, Review, Request } = require('../models')

const seed = async () => {
    const userData = await User.bulkCreate([
        {
        email:"meep@meep.com",
        password:"password",
        first_name:'Lindsay',
        username:"meep"
    },
    {
        email:"test@test.com",
        password:"password",
        first_name:'Tester',
        username:"potato"
    },
    {
        email:"linds@linds.com",
        password:"password",
        first_name:'Hiiiiii',
        username:"lfbaby"
    }],
    {
        individualHooks:true
    })

    

    const requestData = await Request.bulkCreate([
        {
        accepted:false,
        SenderId: 1,
        ReceiverId:2
    },
    {
        accepted:false,
        SenderId: 1,
        ReceiverId:3
    },

])

    const shelfData = await Shelf.bulkCreate([
        {
            name: "Faves",
            description: "All time favorite books",
            last_update:"2022-08-26 11:07:12",
            UserId:1,
        },
        {
            name: "TBR",
            description: "Desperately want to read these",
            last_update:"2022-06-26 11:07:12",
            UserId:2,
        },
        {
            name: "To Be Read",
            description: "Eeeep can't wait to read these!",
            last_update:"2022-01-26 11:07:12",
            UserId:1,
        },
        {
            name: "Upcoming Releases",
            description: "Counting Down the Days",
            last_update:"2022-07-26 11:07:12",
            UserId:1,
        },
        {
            name: "DNF",
            description: "Boo these books",
            last_update:"2022-04-26 11:07:12",
            UserId:1,
        },
        {
            name: "Best of All Time",
            description: "Classics that I love and you should too",
            last_update:"2022-08-24 11:07:12",
            UserId:2,
        },
    ])

    const bookData = await Book.bulkCreate([
        {
            title:"A Touch of Darkness",
            author:"Scarlett St. Clair",
            author_key:"OL8187471A",
            description:"",
            cover_img:"https://covers.openlibrary.org/b/olid/OL28946291M-M.jpg",
            pages:354,
            published:2019,
            edition_key:"/works/OL21370801W",
        },
        {
            title:"A Court of Wings and Ruin",
            author:"Sarah J. Maas",
            author_key:"OL7115219A",
            description:"Feyre returns to the Spring Court on a reconaissance mission about the invading king. As a spy, the future of the entire kingdom may rely on her ability to play her part perfectly, and her decisions about who to trust and which allies are best will decide the outcome of the coming war.",
            cover_img:"https://covers.openlibrary.org/b/olid/OL26832221M-M.jpg",
            pages:720,
            published:2017,
            edition_key:"/works/OL17860745W",
        },
        {
            title:"A Court of Thorns and Roses",
            author:"Sarah J. Maas",
            author_key:"OL7115219A",
            description:"Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold, bleak place in the long winter months. So when she spots a deer in the forest being pursued by a wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and killing something so precious comes at a price ...\r\n\r\nDragged to a magical kingdom for the murder of a faerie, Feyre discovers that her captor, his face obscured by a jewelled mask, is hiding far more than his piercing green eyes would suggest. Feyre's presence at the court is closely guarded, and as she begins to learn why, her feelings for him turn from hostility to passion and the faerie lands become an even more dangerous place. Feyre must fight to break an ancient curse, or she will lose him forever.\r\n\r\nBook #1",
            cover_img:"https://covers.openlibrary.org/b/olid/OL27099075M-M.jpg",
            pages:432,
            published:2015,
            edition_key:"/works/OL17352669W",
        },
        {
            title:"A Court of Mist and Fury",
            author:"Sarah J. Maas",
            author_key:"OL7115219A",
            description:"Though Feyre now has the powers of the High Fae, her heart remains human, but as she navigates the feared Night Court's dark web of politics, passion, and dazzling power, a greater evil looms--and she might be key to stopping it.",
            cover_img:"https://covers.openlibrary.org/b/olid/OL26992991M-M.jpg",
            pages:640,
            published:2016,
            edition_key:"/works/OL17860744W",
        },
        {
            title:"House of Earth and Blood",
            author:"Sarah J. Maas",
            author_key:"OL7115219A",
            description:"",
            cover_img:"https://covers.openlibrary.org/b/olid/OL27924119M-M.jpg",
            pages:816,
            published:2021,
            edition_key:"/works/OL26517160W",
        },
        {
            title:"House of Sky and Breath",
            author:"Sarah J. Maas",
            description:"Bryce Quinlan and Hunt Athalar are trying to get back to normal―they may have saved Crescent City, but with so much upheaval in their lives lately, they mostly want a chance to relax. Slow down. Figure out what the future holds. The Asteri have kept their word so far, leaving Bryce and Hunt alone. But with the rebels chipping away at the Asteri’s power, the threat the rulers pose is growing. As Bryce, Hunt, and their friends get pulled into the rebels’ plans, the choice becomes clear: stay silent while others are oppressed, or fight for what’s right. And they’ve never been very good at staying silent. In this sexy, action-packed sequel to the #1 bestseller House of Earth and Blood, Sarah J. Maas weaves a captivating story of a world about to explode―and the people who will do anything to save it.",
            cover_img:"/assets/no-cover.jpeg",
            pages:807,
            published:2022,
        },
        {
            title:"Empire of Storms",
            author:"Sarah J. Maas",
            author_key:"OL7115219A",
            description:"The long path to the throne has only just begun for Aelin Galathynius. Loyalties have been broken and bought, friends have been lost and gained, and those who possess magic find themselves at odds with those who don't.\r\n\r\nWith her heart sworn to the warrior-prince by her side, and her fealty pledged to the people she is determined to save, Aelin will delve into the depths of her power to protect those she loves. But as monsters emerge from the horrors of the past, and dark forces become poised to claim her world, the only chance for salvation will lie in a desperate quest that may mark the end of everything Aelin holds dear.\r\n\r\nIn this breathtaking fifth installment of the New York Times bestselling Throne of Glass series, Aelin will have to choose what -- and who -- to sacrifice if she's to keep the world of Erilea from breaking apart.",
            cover_img:"https://covers.openlibrary.org/b/olid/OL26319926M-M.jpg",
            pages:712,
            published:2016,
            edition_key:"/works/OL17625829W",
        },
        {
            title:"The Ruin of Kings",
            author:"Jenn Lyons",
            author_key:"OL9177386A",
            description:"Kihrin is a bastard orphan who grew up on storybook tales of long-lost princes and grand quests. When he is claimed against his will as the long-lost son of a treasonous prince, Kihrin finds that being a long-lost prince isn't what the storybooks promised.\r\n\r\nFar from living the dream, Kihrin finds himself practically a prisoner, at the mercy of his new family's power plays and ambitions. He also discovers that the storybooks have lied about a lot of other things too: dragons, demons, gods, prophecies, true love, and how the hero always wins.\r\n\r\nThen again, maybe he's not the hero, for Kihrin is not destined to save the empire.",
            cover_img:"https://covers.openlibrary.org/b/olid/OL27760114M-M.jpg",
            pages:576,
            published:2019,
            edition_key:"/works/OL20521134W",
        },
        {
            title:"The Memory of Souls",
            author:"Jenn Lyons",
            author_key:"OL9177386A",
            description:"Now that Relos Var’s plans have been revealed and demons are free to rampage across the empire, the fulfillment of the ancient prophecies—and the end of the world—is closer than ever.\r\n\r\nTo buy time for humanity, Kihrin needs to convince the king of the Manol vané to perform an ancient ritual which will strip the entire race of their immortality, but it’s a ritual which certain vané will do anything to prevent. Including assassinating the messengers.\r\n\r\nWorse, Kihrin must come to terms with the horrifying possibility that his connection to the king of demons, Vol Karoth, is growing steadily in strength.\r\n\r\nHow can he hope to save anyone when he might turn out to be the greatest threat of them all?",
            cover_img:"https://covers.openlibrary.org/b/olid/OL28178905M-M.jpg",
            pages:656,
            published:2020,
            edition_key:"/works/OL20814818W",
        },
        {
            title:"The Discord of Gods",
            author:"Jenn Lyons",
            author_key:"OL9177386A",
            description:"The end times have come.\r\n\r\nRelos Var's final plans to enslave the universe are on the cusp of fruition. He believes there's only one being in existence that might be able to stop him: the demon Xaltorath.\r\n\r\nAs these two masterminds circle each other, neither is paying attention to the third player on the board, Kihrin. Unfortunately, keeping himself classified in the \"pawn\" category means Kihrin must pretend to be everything the prophecies threatened he'd become: the destroyer of all, the sun eater, a mindless, remorseless plague upon the land. It also means finding an excuse to not destroy the people he loves (or any of the remaining Immortals) without arousing suspicion.\r\n\r\nKihrin's goals are complicated by the fact that not all of his \"act\" is one. His intentions may be sincere, but he's still being forced to grapple with the aftereffects of the corrupted magic ritual that twisted both him and the dragons. Worse, he's now tied to a body that is the literal avatar of a star - a form that is becoming increasingly, catastrophically unstable. All of which means he's running out of time.",
            cover_img:"https://covers.openlibrary.org/b/olid/OL34161957M-M.jpg",
            pages:512,
            published:2022,
            edition_key:"/works/OL25472967W",
        },
    ])

    await bookData[1].addShelf(1)
    await bookData[2].addShelf(1)
    await bookData[2].addShelf(3)
    await bookData[7].addShelf(6)
    await bookData[4].addShelf(4)
    await bookData[5].addShelf(4)
    await bookData[8].addShelf(2)
    await bookData[3].addShelf(5)
    await bookData[5].addShelf(1)

    const reviewData = await Review.bulkCreate([
        {
            read:true,
            date_started:"2022-03-22",
            date_finished:"2022-03-23",
            year_finished:2022,
            month_finished: 3,
            rating:5,
            review:"One of my favorite books of all time srsly",
            format:"Kindle",
            series:"Crescent City #1",
            UserId:1, 
            BookId:5,
        },
        {
            read:true,
            date_started:"2022-04-22",
            date_finished:"2022-04-24",
            year_finished:2022,
            month_finished: 4,
            rating:3,
            review:"I enjoyed it but objectively a bad book",
            format:"Kindle",
            series:"Persephone x Hades #1",
            UserId:1,
            BookId:1,
        },
        {
            read:true,
            date_started:"2022-05-22",
            date_finished:"2022-05-25",
            year_finished:2022,
            month_finished: 5,
            rating:4,
            review:"Best book in this series in my opinion",
            format:"Kindle",
            series:"ACOTAR #2",
            UserId:2, 
            BookId:2,
        },
        {
            read:false,
            UserId:1,
            BookId:9,
        },
    ])

    await userData[1].addSender(1)

    await userData[1].addBook(10)
}

sequelize.sync({force:true}).then(()=>{
    seed();
})