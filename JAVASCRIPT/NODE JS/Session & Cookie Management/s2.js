const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.get("/set", (req, res) => {

    res.cookie("username", "Karishma");

    res.send("Cookie set.");

});

app.get("/read", (req, res) => {

    res.send(
        "Username: " +
        req.cookies.username
    );

});

app.get("/delete", (req, res) => {

    res.clearCookie("username");

    res.send("Cookie deleted.");

});

app.listen(3000);