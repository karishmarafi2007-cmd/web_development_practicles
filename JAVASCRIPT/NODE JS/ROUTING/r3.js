const express = require("express");

const router = express.Router();

router.get("/students", (req, res) => {
    res.send("Students");
});

router.get("/products", (req, res) => {
    res.send("Products");
});

router.get("/users", (req, res) => {
    res.send("Users");
});

module.exports = router;