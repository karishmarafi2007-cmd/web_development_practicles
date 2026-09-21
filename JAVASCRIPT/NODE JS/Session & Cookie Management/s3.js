const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({

    secret: "mysecret",
    resave: false,
    saveUninitialized: true

}));

app.get("/login", (req, res) => {

    req.session.username = "Karishma";

    res.send("Session created.");

});

app.get("/profile", (req, res) => {

    res.send(
        "Welcome " +
        req.session.username
    );

});

app.listen(3000);