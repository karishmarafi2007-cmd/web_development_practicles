const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json([
        {
            id: 1,
            name: "Karishma"
        },
        {
            id: 2,
            name: "Ananya"
        }
    ]);

});

router.get("/:id", (req, res) => {

    res.send(
        "Student ID: " + req.params.id
    );

});

module.exports = router;