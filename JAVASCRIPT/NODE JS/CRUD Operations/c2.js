const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));

let students = [
    {
        id: 1,
        name: "Karishma",
        age: 19,
        course: "Computing and Data Science"
    }
];

// GET - Display all students
app.get("/api/students", (req, res) => {

    res.json(students);

});

// POST - Add student
app.post("/api/students", (req, res) => {

    const { name, age, course } = req.body;

    const student = {
        id: Date.now(),
        name,
        age,
        course
    };

    students.push(student);

    res.status(201).json(student);

});

// PUT - Update student
app.put("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;

    res.json(student);

});

// DELETE - Delete student
app.delete("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    students = students.filter(s => s.id !== id);

    res.json({
        message: "Student deleted successfully"
    });

});

app.listen(PORT, () => {

    console.log(
        `Student Management App running at http://localhost:${PORT}`
    );

});