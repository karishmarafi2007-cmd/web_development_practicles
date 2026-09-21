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

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});