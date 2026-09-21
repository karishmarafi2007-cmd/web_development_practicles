const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        category: "Electronics"
    }
];

// CREATE PRODUCT
app.post("/products", (req, res) => {

    const { name, price, category } = req.body;

    const product = {
        id: Date.now(),
        name,
        price,
        category
    };

    products.push(product);

    res.status(201).json({
        message: "Product created successfully",
        product
    });

});

// READ PRODUCTS
app.get("/products", (req, res) => {

    res.json(products);

});

// UPDATE PRODUCT
app.put("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product =
        products.find(p => p.id === id);

    if (!product) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;

    res.json({
        message: "Product updated successfully",
        product
    });

});

// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const index =
        products.findIndex(p => p.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    products.splice(index, 1);

    res.json({
        message: "Product deleted successfully"
    });

});

app.listen(PORT, () => {

    console.log(
        `Product Management App running at http://localhost:${PORT}`
    );

});