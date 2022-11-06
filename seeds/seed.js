const sequelize = require("../config/connection");
const { User, Book, Shelf, Review, ActivityGoal, Tag, Profile, Note } = require('../models');


const seed = async () => {
    const userData = await User.bulkCreate([
        {
            email: "meep@meep.com",
            password: "password",
        },
        {
            email: "test@test.com",
            password: "password",
        }],
        {
            individualHooks: true
        })

    userData[0].createProfile({
        first_name: 'Lindsay',
        username: "meep",
        last_login: new Date()
    })
    userData[1].createProfile({
        first_name: 'Tester',
        username: "potato",
        public:false,
        last_login: new Date()
    })


    const shelfData = await Shelf.bulkCreate([
        {
            name: "Want To Read",
            last_update: new Date(),
            UserId: 1
        },
        {
            name: "Want To Read",
            last_update: new Date(),
            UserId: 2
        },
        {
            name: "All-Time Favorites",
            description: "My 5-star reads forever. Would read these 100 times and recommend them to everyone I know. I loooove these books",
            last_update: "2022-08-26 11:07:12",
            UserId: 1,
            public: true
        },
        {
            name: "TBR",
            description: "Desperately want to read these",
            last_update: "2022-06-26 11:07:12",
            UserId: 2,
        },
        {
            name: "To Be Read",
            description: "Without a doubt going to be my largest shelf lol",
            last_update: "2022-01-26 11:07:12",
            UserId: 1,
        },
        {
            name: "Adult Fantasy",
            description: "Fantasy books with Adult themes that aren't just smut lmao. These books fit more into the classic definition of Fantasy, imo.",
            last_update: "2022-07-26 11:07:12",
            UserId: 1,
        },
        {
            name: "Fantasy Romance",
            description: "Most of these are objectively not great books but I still devoured them.",
            last_update: "2022-04-26 11:07:12",
            UserId: 1,
        },
        {
            name: "Best of All Time",
            description: "Classics that I love and you should too",
            last_update: "2022-08-24 11:07:12",
            UserId: 2,
        },
    ])

    const bookData = await Book.bulkCreate([
        {
            title: "A Touch of Darkness",
            author: "Scarlett St. Clair",
            author_key: "/authors/OL8187471A",
            description: "Persephone is the Goddess of Spring by title only. The truth is, since she was a little girl, flowers have shriveled at her touch. After moving to New Athens, she hopes to lead an unassuming life disguised as a mortal journalist. Hades, God of the Dead, has built a gambling empire in the mortal world and his favorite bets are rumored to be impossible. After a chance encounter with Hades, Persephone finds herself in a contract with the God of the Dead and the terms are impossible: Persephone must create life in the Underworld or lose her freedom forever. The bet does more than expose Persephone's failure as a goddess, however. As she struggles to sow the seeds of her freedom, love for the God of the Dead grows-and it's forbidden.",
            cover_img: "https://covers.openlibrary.org/b/id/10666897-M.jpg",
            pages: 354,
            published: "Jun 20, 2019",
            ol_key: "/books/OL31995429M",
            isbn: '9781070723310'
        },
        {
            title: "A Court of Wings and Ruin",
            author: "Sarah J. Maas",
            author_key: "/authors/OL7115219A",
            description: "Feyre returns to the Spring Court on a reconaissance mission about the invading king. As a spy, the future of the entire kingdom may rely on her ability to play her part perfectly, and her decisions about who to trust and which allies are best will decide the outcome of the coming war.",
            cover_img: "https://covers.openlibrary.org/b/id/8506724-M.jpg",
            pages: 720,
            published: "Feb 21, 2017",
            ol_key: "/books/OL37072070M",
            isbn: '9781681197753'
        },
        {
            title: "A Court of Thorns and Roses",
            author: "Sarah J. Maas",
            author_key: "/authors/OL7115219A",
            description: "Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold, bleak place in the long winter months. So when she spots a deer in the forest being pursued by a wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and killing something so precious comes at a price ...\r\n\r\nDragged to a magical kingdom for the murder of a faerie, Feyre discovers that her captor, his face obscured by a jewelled mask, is hiding far more than his piercing green eyes would suggest. Feyre's presence at the court is closely guarded, and as she begins to learn why, her feelings for him turn from hostility to passion and the faerie lands become an even more dangerous place. Feyre must fight to break an ancient curse, or she will lose him forever.\r\n\r\nBook #1",
            cover_img: "https://covers.openlibrary.org/b/olid/OL27099075M-M.jpg",
            pages: 432,
            published: "May 05, 2015",
            ol_key: "/books/OL27099073M",
            isbn: '9780606385480'
        },
        {
            title: "A Court of Mist and Fury",
            author: "Sarah J. Maas",
            author_key: "/authors/OL7115219A",
            description: "Though Feyre now has the powers of the High Fae, her heart remains human, but as she navigates the feared Night Court's dark web of politics, passion, and dazzling power, a greater evil looms--and she might be key to stopping it.",
            cover_img: "https://covers.openlibrary.org/b/id/11488972-M.jpg",
            pages: 640,
            published: "May 03, 2016",
            ol_key: "/books/OL32856480M",
            isbn: "9781408857885"
        },
        {
            title: "House of Earth and Blood",
            author: "Sarah J. Maas",
            author_key: "/authors/OL7115219A",
            description: "Half-Fae, half-human Bryce Quinlan loves her life. By day, she works for an antiquities dealer, selling barely legal magical artifacts, and by night, she parties with her friends, savouring every pleasure Lunathion - otherwise known as Crescent City - has to offer. But it all comes crumbling down when a ruthless murder shakes the very foundations of the city - and Bryce's world. Two years later, her job has become a dead end, and she now seeks only blissful oblivion in the city's most notorious nightclubs. But when the murderer attacks again, Bryce finds herself dragged into the investigation and paired with an infamous Fallen angel whose own brutal past haunts his every step. Hunt Athalar, personal assassin for the Archangels, wants nothing to do with Bryce Quinlan, despite being ordered to protect her. She stands for everything he once rebelled against and seems more interested in partying than solving the murder, no matter how close to home it might hit. But Hunt soon realizes there's far more to Bryce than meets the eye - and that he's going to have to find a way to work with her if they want to solve this case. As Bryce and Hunt race to untangle the mystery, they have no way of knowing the threads they tug ripple through the underbelly of the city, across warring continents, and down to the darkest levels of Hel, where things that have been sleeping for millennia are beginning to stir...",
            cover_img: "https://covers.openlibrary.org/b/olid/OL27924119M-M.jpg",
            pages: 816,
            published: "Mar 03, 2020",
            ol_key: "/books/OL32388174M",
            isbn: '9780655672258'
        },
        {
            title: "House of Sky and Breath",
            author: "Sarah J. Maas",
            author_key: "/authors/OL7115219A",
            description: "Bryce Quinlan and Hunt Athalar are trying to get back to normal―they may have saved Crescent City, but with so much upheaval in their lives lately, they mostly want a chance to relax. Slow down. Figure out what the future holds. The Asteri have kept their word so far, leaving Bryce and Hunt alone. But with the rebels chipping away at the Asteri’s power, the threat the rulers pose is growing. As Bryce, Hunt, and their friends get pulled into the rebels’ plans, the choice becomes clear: stay silent while others are oppressed, or fight for what’s right. And they’ve never been very good at staying silent. In this sexy, action-packed sequel to the #1 bestseller House of Earth and Blood, Sarah J. Maas weaves a captivating story of a world about to explode―and the people who will do anything to save it.",
            cover_img: "https://covers.openlibrary.org/b/id/11051753-M.jpg",
            pages: 807,
            published: 'Feb 15, 2022',
            ol_key: '/books/OL37234427M',
            isbn: '1635574072'
        },
        {
            title: "Empire of Storms",
            author: "Sarah J. Maas",
            author_key: "/authors/OL7115219A",
            description: "The long path to the throne has only just begun for Aelin Galathynius. Loyalties have been broken and bought, friends have been lost and gained, and those who possess magic find themselves at odds with those who don't.\r\n\r\nWith her heart sworn to the warrior-prince by her side, and her fealty pledged to the people she is determined to save, Aelin will delve into the depths of her power to protect those she loves. But as monsters emerge from the horrors of the past, and dark forces become poised to claim her world, the only chance for salvation will lie in a desperate quest that may mark the end of everything Aelin holds dear.\r\n\r\nIn this breathtaking fifth installment of the New York Times bestselling Throne of Glass series, Aelin will have to choose what -- and who -- to sacrifice if she's to keep the world of Erilea from breaking apart.",
            cover_img: "https://covers.openlibrary.org/b/olid/OL26319926M-M.jpg",
            pages: 712,
            published: "Sep 06, 2016",
            ol_key: "/books/OL27696715M",
            isbn: '9781408872895'
        },
        {
            title: "The Ruin of Kings",
            author: "Jenn Lyons",
            author_key: "/authors/OL7753430A",
            description: "Kihrin is a bastard orphan who grew up on storybook tales of long-lost princes and grand quests. When he is claimed against his will as the long-lost son of a treasonous prince, Kihrin finds that being a long-lost prince isn't what the storybooks promised.\r\n\r\nFar from living the dream, Kihrin finds himself practically a prisoner, at the mercy of his new family's power plays and ambitions. He also discovers that the storybooks have lied about a lot of other things too: dragons, demons, gods, prophecies, true love, and how the hero always wins.\r\n\r\nThen again, maybe he's not the hero, for Kihrin is not destined to save the empire.",
            cover_img: "https://covers.openlibrary.org/b/isbn/9781509879502-M.jpg",
            pages: 576,
            published: 'May 02, 2019',
            ol_key: "/books/OL29792696M",
            isbn: '9781250175496'
        },
        {
            title: "The Memory of Souls",
            author: "Jenn Lyons",
            author_key: "/authors/OL7753430A",
            description: "Now that Relos Var’s plans have been revealed and demons are free to rampage across the empire, the fulfillment of the ancient prophecies—and the end of the world—is closer than ever.\r\n\r\nTo buy time for humanity, Kihrin needs to convince the king of the Manol vané to perform an ancient ritual which will strip the entire race of their immortality, but it’s a ritual which certain vané will do anything to prevent. Including assassinating the messengers.\r\n\r\nWorse, Kihrin must come to terms with the horrifying possibility that his connection to the king of demons, Vol Karoth, is growing steadily in strength.\r\n\r\nHow can he hope to save anyone when he might turn out to be the greatest threat of them all?",
            cover_img: "https://covers.openlibrary.org/b/olid/OL28178905M-M.jpg",
            pages: 656,
            published: 'Aug 25, 2020',
            ol_key: "/books/OL29831091M",
            isbn: '9781250175564'
        },
        {
            title: "The Discord of Gods",
            author: "Jenn Lyons",
            author_key: "/authors/OL7753430A",
            description: "The end times have come.\r\n\r\nRelos Var's final plans to enslave the universe are on the cusp of fruition. He believes there's only one being in existence that might be able to stop him: the demon Xaltorath.\r\n\r\nAs these two masterminds circle each other, neither is paying attention to the third player on the board, Kihrin. Unfortunately, keeping himself classified in the \"pawn\" category means Kihrin must pretend to be everything the prophecies threatened he'd become: the destroyer of all, the sun eater, a mindless, remorseless plague upon the land. It also means finding an excuse to not destroy the people he loves (or any of the remaining Immortals) without arousing suspicion.\r\n\r\nKihrin's goals are complicated by the fact that not all of his \"act\" is one. His intentions may be sincere, but he's still being forced to grapple with the aftereffects of the corrupted magic ritual that twisted both him and the dragons. Worse, he's now tied to a body that is the literal avatar of a star - a form that is becoming increasingly, catastrophically unstable. All of which means he's running out of time.",
            cover_img: "https://covers.openlibrary.org/b/olid/OL34161957M-M.jpg",
            pages: 512,
            published: 'April 2022',
            ol_key: "/books/OL37998226M",
            isbn: '9781509879656'
        },
        {
            title: "Verity",
            author: "Colleen Hoover",
            author_key: null,
            description: "Lowen Ashleigh is a struggling writer on the brink of financial ruin when she accepts the job offer of a lifetime. Jeremy Crawford, husband of bestselling author Verity Crawford, has hired Lowen to complete the remaining books in a successful series his injured wife is unable to finish.\r\n \r\nLowen arrives at the Crawford home, ready to sort through years of Verity’s notes and outlines, hoping to find enough material to get her started. What Lowen doesn’t expect to uncover in the chaotic office is an unfinished autobiography Verity never intended for anyone to read. Page after page of bone-chilling admissions, including Verity's recollection of the night her family was forever altered.\r\n \r\nLowen decides to keep the manuscript hidden from Jeremy, knowing its contents could devastate the already grieving father. But as Lowen’s feelings for Jeremy begin to intensify, she recognizes all the ways she could benefit if he were to read his wife’s words. After all, no matter how devoted Jeremy is to his injured wife, a truth this horrifying would make it impossible for him to continue loving her.",
            cover_img: "https://covers.openlibrary.org/b/id/12501101-M.jpg",
            pages: 154,
            published: "Dec 10, 2018",
            ol_key: "/books/OL36038052M",
            isbn: "9781804227046"
        },
        {
            title: "It Ends With Us",
            author: "Colleen Hoover",
            author_key: null,
            description: "Lily hasn’t always had it easy, but that’s never stopped her from working hard for the life she wants. She’s come a long way from the small town where she grew up—she graduated from college, moved to Boston, and started her own business. And when she feels a spark with a gorgeous neurosurgeon named Ryle Kincaid, everything in Lily’s life seems too good to be true.\r\n\r\nRyle is assertive, stubborn, maybe even a little arrogant. He’s also sensitive, brilliant, and has a total soft spot for Lily. And the way he looks in scrubs certainly doesn’t hurt. Lily can’t get him out of her head. But Ryle’s complete aversion to relationships is disturbing. Even as Lily finds herself becoming the exception to his “no dating” rule, she can’t help but wonder what made him that way in the first place.\r\n\r\nAs questions about her new relationship overwhelm her, so do thoughts of Atlas Corrigan—her first love and a link to the past she left behind. He was her kindred spirit, her protector. When Atlas suddenly reappears, everything Lily has built with Ryle is threatened.\r\n\r\nWith this bold and deeply personal novel, It Ends With Us is a heart-wrenching story and an unforgettable tale of love that comes at the ultimate price.",
            cover_img: "https://covers.openlibrary.org/b/id/12916657-M.jpg",
            "pages": 384,
            published: "Aug 02, 2016",
            ol_key: "/books/OL39479218M",
            isbn: "9781501110368"
        },
        {
            title: "The Seven Husbands of Evelyn Hugo",
            author: "Taylor Jenkins Reid",
            author_key: null,
            description: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself. Why her? Why now?\r\n\r\nMonique is not exactly on top of the world. Her husband has left her, and her professional life is going nowhere. Regardless of why Evelyn has selected her to write her biography, Monique is determined to use this opportunity to jumpstart her career.\r\n\r\nSummoned to Evelyn's luxurious apartment, Monique listens in fascination as the actress tells her story. From making her way to Los Angeles in the 1950s to her decision to leave show business in the '80s, and, of course, the seven husbands along the way, Evelyn unspools a tale of ruthless ambition, unexpected friendship, and a great forbidden love. Monique begins to feel a very real connection to the legendary star, but as Evelyn's story near its conclusion, it becomes clear that her life intersects with Monique's own in tragic and irreversible ways.\r\n\r\nWritten with Reid's signature talent for creating \"complex, likable characters\" (Real Simple), this is a mesmerizing journey through the splendor of old Hollywood into the harsh realities of the present day as two women struggle with what it means—and what it costs—to face the truth",
            cover_img: "https://covers.openlibrary.org/b/id/8354226-M.jpg",
            pages: 400,
            published: "2018",
            ol_key: "/books/OL28621809M",
            isbn: "9781501161933"
        },
        {
            title: "Ordinary Monsters",
            author: "J. M. Miro",
            author_key: null,
            description: null,
            cover_img: "https://covers.openlibrary.org/b/id/12561480-M.jpg",
            pages: null,
            published: "Jun 07, 2022",
            ol_key: "/books/OL36673766M",
            isbn: "9781250854704"
        },
        {
            title: "The Hundred Thousand Kingdoms",
            author: "N. K. Jemisin",
            author_key: null,
            description: "Yeine Darr is an outcast from the barbarian north.  But when her mother dies under mysterious circumstances, she is summoned to the majestic city of Sky.  There, to her shock, Yeine is named an heiress to the king.  But the throne of the Hundred Thousand Kingdoms is not easily won, and Yeine is thrust into a vicious power struggle with cousins she never knew she had.  As she fights for her life, she draws ever closer to the secrets of her mother's death and her family's bloody history.With the fate of the world hanging in the balance, Yeine will learn how perilous it can be when love and hate - and gods and mortals - are bound inseparably together.",
            cover_img: "https://covers.openlibrary.org/b/id/7716902-M.jpg",
            pages: 432,
            published: "2010",
            ol_key: "/books/OL33409950M",
            isbn: "9780748115907"
        },
        {
            title: "A Court of Silver Flames (A Court of Thorns and Roses #4)",
            author: "Sarah J. Maas",
            author_key: null,
            description: null,
            cover_img: "https://covers.openlibrary.org/b/id/10651205-M.jpg",
            pages: 708,
            published: "2021",
            ol_key: "/books/OL31974187M",
            isbn: "9781526633453"
        },
        {
            title: "Foundryside",
            author: "Robert Jackson Bennett",
            author_key: null,
            description: null,
            cover_img: "https://covers.openlibrary.org/b/id/8807642-M.jpg",
            pages: 512,
            published: "2018",
            ol_key: "/books/OL38383893M",
            isbn: "9781524760373"
        },
        {
            title: "Where the Crawdads Sing",
            author: "Delia Owens",
            author_key: null,
            description: "For years, rumors of the “Marsh Girl” have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. Then the time comes when she yearns to be touched and loved. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life–until the unthinkable happens.\r\n\r\nPerfect for fans of Barbara Kingsolver and Karen Russell, Where the Crawdads Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder. Owens reminds us that we are forever shaped by the children we once were, and that we are all subject to the beautiful and violent secrets that nature keeps.",
            cover_img: "https://covers.openlibrary.org/b/id/10671924-M.jpg",
            pages: 400,
            published: "Mar 30, 2021",
            ol_key: "/books/OL32003396M",
            isbn: "9780735219106"
        },
        {
            title: "The Atlas Six",
            author: "Olivie Blake",
            author_key: null,
            description: null,
            cover_img: "https://covers.openlibrary.org/b/id/10862205-M.jpg",
            pages: 383,
            published: "Jan 30, 2020",
            ol_key: "/books/OL32217912M",
            isbn: "9781679910999"
        },
        {
            title: "Circe",
            author: "Madeline Miller",
            author_key: null,
            description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child--not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power--the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.\r\n\r\nThreatened, Zeus banishes her to a deserted island, where she hones her occult craft, tames wild beasts and crosses paths with many of the most famous figures in all of mythology, including the Minotaur, Daedalus and his doomed son Icarus, the murderous Medea, and, of course, wily Odysseus.\r\n\r\nBut there is danger, too, for a woman who stands alone, and Circe unwittingly draws the wrath of both men and gods, ultimately finding herself pitted against one of the most terrifying and vengeful of the Olympians. To protect what she loves most, Circe must summon all her strength and choose, once and for all, whether she belongs with the gods she is born from, or the mortals she has come to love.\r\n\r\nWith unforgettably vivid characters, mesmerizing language and page-turning suspense, Circe is a triumph of storytelling, an intoxicating epic of family rivalry, palace intrigue, love and loss, as well as a celebration of indomitable female strength in a man's world.\r\n([source][1])\r\n\r\n\r\n  [1]: http://madelinemiller.com/circe/",
            cover_img: "https://covers.openlibrary.org/b/id/8838757-M.jpg",
            pages: 400,
            published: "2018",
            ol_key: "/books/OL27375545M",
            isbn: "9781408890073"
        },
        {
            title: "The Song of Achilles",
            author: "Madeline Miller",
            author_key: null,
            description: "This is the story of the seige of Troy from the perspective of Achilles best-friend Patroclus.  Although Patroclus is outcast from his home for disappointing his father he manages to be the only mortal who can keep up with the half-God Archilles.  Even though many will know the facts behind the story the telling is fresh and engaging.",
            cover_img: "https://covers.openlibrary.org/b/id/10710789-M.jpg",
            pages: 382,
            published: "2011",
            ol_key: "/books/OL32045117M",
            isbn: "9781408891384"
        }


    ])

    const tagData = await Tag.bulkCreate([
        {
            name: 'Fiction'
        },
        {
            name: 'Romance'
        },
        {
            name: 'Fantasy'
        },
        {
            name: 'Science Fiction'
        },
        {
            name: 'Young Adult Fiction'
        },

    ])


    await shelfData[0].addTag(3)

    await bookData[0].addShelf(7)
    await bookData[4].addShelf(3)
    await bookData[6].addShelf(1)
    await bookData[5].addShelf(3)
    await bookData[6].addShelf(4)
    await bookData[8].addShelf(5)
    await bookData[9].addShelf(6)
    await bookData[1].addShelf(5)
    await bookData[2].addShelf(7)
    await bookData[3].addShelf(7)

    await bookData[1].addShelf(2)
    await bookData[8].addShelf(2)

    await bookData[0].addTag(1)
    await bookData[0].addTag(2)
    await bookData[1].addTag(2)
    await bookData[1].addTag(3)

    const userProfile = await Profile.findByPk(1)

    await userProfile.addTag(3)


    const reviewData = await Review.bulkCreate([
        {
            public: true,
            date_started: "2022-09-08",
            date_finished: "2022-09-10",
            year_finished: 2022,
            month_finished: 8,
            rating: 5,
            review: "I LOVED THIS BOOK SO MUCH. I am pretty sure it is the only book that has ever made me actually cry. The magic system is complicated and interesting, which I love and the characters are very lovable and well developed. I love the mix of magic and fantasy with a modern, relatable setting and character interaction. This book is really long - 800 pages - and I literally devoured it so quickly I thought it could have (and should have) been WAY longer. My one and only complaint is that SO MUCH HAPPENS in the last like 200 pages, and I think it could have probably been spread out a bit more across the first 600 lol. Obsessed with this book anyways. Adult fantasy; fast paced; character driven mostly but plot driven at the end.",
            format: "Kindle",
            series: "Crescent City #1",
            UserId: 1,
            BookId: 5,
        },
        {
            date_started: "2022-07-22",
            date_finished: "2022-07-24",
            year_finished: 2022,
            month_finished: 6,
            rating: 3,
            review: "Ok so this book is terrible, don't get me wrong - but I genuinely really enjoyed it lol I love a good retelling and I loved the gods and the hades/persephone myth reimagined in modern times. It was certainly not a masterpiece or immaculate writing but it was en joyable to read, I felt attached to the characters, and the plot moved along well and was entertaining. I wasn't expecting like a beautifully written book anyways so this absolutely satisfied those expectations and was an enjoyable read. Honestly - prob a 2 star for the writing itself but a 4 star for enjoyment factor",
            format: "Kindle",
            series: "Persephone x Hades #1",
            UserId: 1,
            BookId: 1,
        },
        {
            date_started: "2022-08-22",
            date_finished: "2022-08-25",
            year_finished: 2022,
            month_finished: 7,
            rating: 4,
            review: "Best book in this series in my opinion",
            format: "Kindle",
            series: "ACOTAR #2",
            UserId: 1,
            BookId: 2,
        },
        
    ])


    const noteData = await Note.bulkCreate([
        {
            content:"I am loving this",
            progress:'200/512',
            status:'Currently Reading',
            UserId: 1,
            BookId: 10,
        },
    ])

    const goalData = await ActivityGoal.bulkCreate([
        {
            month: 8,
            year: 2022,
            value: 3,
            UserId: 1
        },
        {
            month: 7,
            year: 2022,
            value: 4,
            UserId: 1
        },
        {
            year: 2022,
            value: 40,
            UserId: 1
        },
        {
            year: 2021,
            value: 30,
            UserId: 1
        },
        {
            year: 2020,
            value: 36,
            UserId: 1
        }
    ])

    await userData[1].addFriend1(1)
    await userData[0].addSender(2)


    await userData[0].addDNF(bookData[2])
    await userData[0].addOwned(bookData[4])
    await userData[0].addOwned(bookData[6])
    await userData[0].addCurrentRead(bookData[9])
    await userData[0].addCurrentRead(bookData[1])
    await userData[0].addRead(bookData[1])


}

sequelize.query("SET FOREIGN_KEY_CHECKS = 0").then(()=> {
    sequelize.sync({ force: true }).
    then(() => {
        seed().then(()=> {
            db.query('SET FOREIGN_KEY_CHECKS = 1')
        })
    })

})