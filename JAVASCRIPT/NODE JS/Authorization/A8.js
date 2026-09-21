const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let students = [];

app.post("/students", (req, res) => {

    const { name, course } = req.body;

    const student = {
        id: students.length + 1,
        name: name,
        course: course
    };

    students.push(student);

    res.status(201).json({
        message: "Student created successfully",
        student: student
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});