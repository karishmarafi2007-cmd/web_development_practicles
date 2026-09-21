const Database = require("better-sqlite3");

const db = new Database("college.db");

// Update student age
const updateStudent = db.prepare(`
    UPDATE students
    SET age = ?
    WHERE name = ?
`);

const result = updateStudent.run(20, "Karishma");

if (result.changes > 0) {
    console.log("Student record updated successfully!");
} else {
    console.log("Student record not found.");
}

db.close();