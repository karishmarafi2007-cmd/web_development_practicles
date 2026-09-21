const express = require("express");

const app = express();

app.use((req, res, next) => {

    console.log("Middleware 1");

    next();

});

app.use((req, res, next) => {

    console.log("Middleware 2");

    next();

});

app.get("/", (req, res) => {

    console.log("Route Handler");

    res.send("Request completed");

});

app.listen(3000);