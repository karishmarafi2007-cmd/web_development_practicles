const Database = require("better-sqlite3");

const db = new Database("college.db");

// Create table if it does not exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        course TEXT
    )
`).run();

// Insert student data
const insertStudent = db.prepare(`
    INSERT INTO students (name, age, course)
    VALUES (?, ?, ?)
`);

const result = insertStudent.run(
    "Karishma",
    19,
    "Computing and Data Science"
);

console.log("Student inserted successfully!");
console.log("Student ID:", result.lastInsertRowid);

db.close();