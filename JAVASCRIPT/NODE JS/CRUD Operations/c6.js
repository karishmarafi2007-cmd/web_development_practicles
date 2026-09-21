const express = require("express");
const Database = require("better-sqlite3");

const app = express();

const PORT = 3000;

app.use(express.json());

const db = new Database("students.db");


// Create table
db.prepare(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        course TEXT NOT NULL
    )
`).run();


// Validation function
function validateStudent(name, age, course) {

    if (!name || name.trim() === "") {
        return "Name is required";
    }

    if (!age || isNaN(age)) {
        return "Age must be a number";
    }

    if (age < 16 || age > 100) {
        return "Age must be between 16 and 100";
    }

    if (!course || course.trim() === "") {
        return "Course is required";
    }

    return null;
}


// CREATE
app.post("/students", (req, res) => {

    const { name, age, course } = req.body;

    const error =
        validateStudent(name, age, course);

    if (error) {

        return res.status(400).json({
            error: error
        });

    }

    const result = db.prepare(`
        INSERT INTO students
        (name, age, course)
        VALUES (?, ?, ?)
    `).run(
        name.trim(),
        Number(age),
        course.trim()
    );

    res.status(201).json({
        message: "Student added successfully",
        id: result.lastInsertRowid
    });

});


// READ
app.get("/students", (req, res) => {

    const students =
        db.prepare(`
            SELECT * FROM students
        `).all();

    res.json(students);

});


// UPDATE
app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const { name, age, course } = req.body;

    if (!Number.isInteger(id)) {

        return res.status(400).json({
            error: "Invalid student ID"
        });

    }

    const error =
        validateStudent(name, age, course);

    if (error) {

        return res.status(400).json({
            error: error
        });

    }

    const result = db.prepare(`
        UPDATE students
        SET name = ?,
            age = ?,
            course = ?
        WHERE id = ?
    `).run(
        name.trim(),
        Number(age),
        course.trim(),
        id
    );

    if (result.changes === 0) {

        return res.status(404).json({
            error: "Student not found"
        });

    }

    res.json({
        message: "Student updated successfully"
    });

});


// DELETE
app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {

        return res.status(400).json({
            error: "Invalid student ID"
        });

    }

    const result = db.prepare(`
        DELETE FROM students
        WHERE id = ?
    `).run(id);

    if (result.changes === 0) {

        return res.status(404).json({
            error: "Student not found"
        });

    }

    res.json({
        message: "Student deleted successfully"
    });

});


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});