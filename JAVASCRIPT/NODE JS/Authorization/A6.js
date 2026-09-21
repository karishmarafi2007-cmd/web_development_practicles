const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        message: "Welcome to REST API"
    });

});

app.get("/api/about", (req, res) => {

    res.json({
        application: "Student REST API",
        version: "1.0"
    });

});

app.listen(PORT, () => {

    console.log(
        `API running at http://localhost:${PORT}`
    );

});