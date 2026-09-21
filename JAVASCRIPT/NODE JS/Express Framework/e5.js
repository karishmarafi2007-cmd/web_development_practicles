const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.send("Student List");

});

router.get("/about", (req, res) => {

    res.send("Student Information");

});

module.exports = router;