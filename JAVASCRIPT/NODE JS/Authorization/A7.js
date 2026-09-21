const express = require("express");

const app = express();

const PORT = 3000;

const students = [
    {
        id: 1,
        name: "Karishma",
        course: "Data Science"
    },
    {
        id: 2,
        name: "Anjali",
        course: "Computer Science"
    }
];

app.get("/students", (req, res) => {

    res.status(200).json(students);

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});