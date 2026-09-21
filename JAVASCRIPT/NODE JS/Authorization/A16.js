const express = require("express");
const Database = require("better-sqlite3");

const app = express();

const PORT = 3000;

app.use(express.json());

const db = new Database("products.db");

// Create table
db.prepare(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    )
`).run();


// CREATE PRODUCT
app.post("/products", (req, res) => {

    const { name, price, category } = req.body;

    if (!name || !price || !category) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    const result = db.prepare(`
        INSERT INTO products
        (name, price, category)
        VALUES (?, ?, ?)
    `).run(name, price, category);

    res.status(201).json({
        message: "Product created successfully",
        id: result.lastInsertRowid
    });

});


// READ PRODUCTS
app.get("/products", (req, res) => {

    const products =
        db.prepare(`
            SELECT * FROM products
        `).all();

    res.json(products);

});


// UPDATE PRODUCT
app.put("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const { name, price, category } = req.body;

    const result = db.prepare(`
        UPDATE products
        SET name = ?,
            price = ?,
            category = ?
        WHERE id = ?
    `).run(name, price, category, id);

    if (result.changes === 0) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    res.json({
        message: "Product updated successfully"
    });

});


// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const result = db.prepare(`
        DELETE FROM products
        WHERE id = ?
    `).run(id);

    if (result.changes === 0) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    res.json({
        message: "Product deleted successfully"
    });

});


app.listen(PORT, () => {

    console.log(
        `Product REST API running at http://localhost:${PORT}`
    );

});