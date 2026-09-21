const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({

    secret: "secret",
    resave: false,
    saveUninitialized: false

}));

function protect(req, res, next) {

    if (req.session.username) {

        next();

    }
    else {

        res.status(401).send(
            "Please login first."
        );

    }

}

app.get("/login", (req, res) => {

    req.session.username = "Karishma";

    res.send("Logged in.");

});

app.get(
    "/dashboard",
    protect,
    (req, res) => {

        res.send("Protected Dashboard");

    }
);

app.listen(3000);