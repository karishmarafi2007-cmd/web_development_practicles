const express = require("express");

const app = express();

app.get("/student/:id", (req, res) => {

    res.send(
        "Student ID: " + req.params.id
    );

});

app.get("/search", (req, res) => {

    res.send(
        "Search: " + req.query.name
    );

});

app.listen(3000);