const express = require("express");

const app = express();

function authenticate(req, res, next) {

    let token = req.headers.authorization;

    if (token === "secret123") {

        next();

    }
    else {

        res.status(401).send(
            "Unauthorized"
        );

    }

}

app.get(
    "/protected",
    authenticate,
    (req, res) => {

        res.send("Welcome to protected route.");

    }
);

app.listen(3000);