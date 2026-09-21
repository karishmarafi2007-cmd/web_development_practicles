const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.get("/set", (req, res) => {

    res.cookie("username", "Karishma");

    res.send("Cookie created.");

});

app.listen(3000);