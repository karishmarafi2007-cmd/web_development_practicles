const express = require("express");

const app = express();

const PORT = 3000;

let students = [
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

app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const index =
        students.findIndex(s => s.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});