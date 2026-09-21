const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let students = [
    {
        id: 1,
        name: "Karishma",
        course: "Data Science"
    }
];

// GET
app.get("/students", (req, res) => {

    res.json(students);

});

// POST
app.post("/students", (req, res) => {

    const student = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    };

    students.push(student);

    res.status(201).json(student);

});

// PUT
app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student =
        students.find(s => s.id === id);

    if (!student) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.json(student);

});

// DELETE
app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    students =
        students.filter(s => s.id !== id);

    res.json({
        message: "Student deleted"
    });

});

app.listen(PORT, () => {

    console.log(
        `REST API running at http://localhost:${PORT}`
    );

});