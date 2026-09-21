const express = require("express");
const Database = require("better-sqlite3");

const app = express();

const PORT = 3000;

app.use(express.json());

// Connect database
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


// CREATE
app.post("/students", (req, res) => {

    const { name, age, course } = req.body;

    if (!name || !age || !course) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    const result = db.prepare(`
        INSERT INTO students
        (name, age, course)
        VALUES (?, ?, ?)
    `).run(name, age, course);

    res.status(201).json({
        message: "Student created",
        id: result.lastInsertRowid
    });

});


// READ
app.get("/students", (req, res) => {

    const students =
        db.prepare(`
            SELECT * FROM students
        `).all();

    res.status(200).json(students);

});


// UPDATE
app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const { name, age, course } = req.body;

    const result = db.prepare(`
        UPDATE students
        SET name = ?,
            age = ?,
            course = ?
        WHERE id = ?
    `).run(name, age, course, id);

    if (result.changes === 0) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    res.json({
        message: "Student updated successfully"
    });

});


// DELETE
app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const result = db.prepare(`
        DELETE FROM students
        WHERE id = ?
    `).run(id);

    if (result.changes === 0) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    res.json({
        message: "Student deleted successfully"
    });

});


app.listen(PORT, () => {

    console.log(
        `Student REST API running at http://localhost:${PORT}`
    );

});