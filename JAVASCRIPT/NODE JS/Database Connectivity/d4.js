const Database = require("better-sqlite3");

const db = new Database("college.db");

// Retrieve all students
const students = db.prepare(`
    SELECT * FROM students
`).all();

console.log("Student Records:");
console.log("----------------------------");

students.forEach((student) => {
    console.log("ID:", student.id);
    console.log("Name:", student.name);
    console.log("Age:", student.age);
    console.log("Course:", student.course);
    console.log("----------------------------");
});

db.close();