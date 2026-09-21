const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary array
let students = [
    {
        id: 1,
        name: "Karishma",
        course: "Computing and Data Science"
    },
    {
        id: 2,
        name: "Madhurya",
        course: "Computer Science"
    }
];

// CREATE - POST
app.post("/students", (req, res) => {

    const { name, course } = req.body;

    const newStudent = {
        id: students.length + 1,
        name: name,
        course: course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});

// READ - GET
app.get("/students", (req, res) => {

    res.json(students);

});

// UPDATE - PUT
app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE - DELETE
app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});