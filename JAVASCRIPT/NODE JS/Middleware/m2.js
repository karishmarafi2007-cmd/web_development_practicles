const express = require("express");

const app = express();

function myMiddleware(req, res, next) {

    console.log("Middleware executed");

    next();

}

app.use(myMiddleware);

app.get("/", (req, res) => {

    res.send("Home Page");

});

app.listen(3000);