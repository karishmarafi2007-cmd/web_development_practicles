const Database = require("better-sqlite3");

const db = new Database("college.db");

// Create students table
const createTable = `
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        course TEXT
    )
`;

db.prepare(createTable).run();

console.log("Students table created successfully!");

// Close database
db.close();