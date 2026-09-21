const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/error", (req, res, next) => {

    const error = new Error("Something went wrong");

    next(error);

});

// 404 handler
app.use((req, res, next) => {

    res.status(404).json({
        message: "API route not found"
    });

});

// Error handling middleware
app.use((err, req, res, next) => {

    console.error(err.message);

    res.status(500).json({
        message: "Internal Server Error",
        error: err.message
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});