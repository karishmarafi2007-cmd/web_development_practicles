const Database = require("better-sqlite3");

// Connect to database
const db = new Database("college.db");

console.log("Database connected successfully!");

// Close database
db.close();

console.log("Database connection closed.");