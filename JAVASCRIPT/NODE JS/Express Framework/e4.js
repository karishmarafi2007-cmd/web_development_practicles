const express = require("express");

const app = express();

app.get("/html", (req, res) => {

    res.send("<h1>Hello HTML</h1>");

});

app.get("/json", (req, res) => {

    res.json({
        name: "Karishma",
        course: "B.Tech"
    });

});

app.listen(3000);