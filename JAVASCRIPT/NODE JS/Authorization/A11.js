const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/success", (req, res) => {

    res.status(200).json({
        message: "Request successful"
    });

});

app.post("/create", (req, res) => {

    res.status(201).json({
        message: "Resource created successfully"
    });

});

app.get("/bad-request", (req, res) => {

    res.status(400).json({
        message: "Bad request"
    });

});

app.get("/unauthorized", (req, res) => {

    res.status(401).json({
        message: "Authentication required"
    });

});

app.get("/forbidden", (req, res) => {

    res.status(403).json({
        message: "Access forbidden"
    });

});

app.get("/not-found", (req, res) => {

    res.status(404).json({
        message: "Resource not found"
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});