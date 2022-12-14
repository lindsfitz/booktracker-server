const express = require('express');
const sequelize = require("./config/connection.js")
const app = express();
const PORT = process.env.PORT || 3005;
const cors = require("cors");


const routes = require("./controllers");
//LOCAL
app.use(cors())
// // DEPLOYED
// app.use(cors({
//     origin:["front end deployed link goes here"]
// }))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
    });
});