const Database = require("better-sqlite3");

const db = new Database("college.db");

// Delete student
const deleteStudent = db.prepare(`
    DELETE FROM students
    WHERE name = ?
`);

const result = deleteStudent.run("Karishma");

if (result.changes > 0) {
    console.log("Student record deleted successfully!");
} else {
    console.log("Student record not found.");
}

db.close();