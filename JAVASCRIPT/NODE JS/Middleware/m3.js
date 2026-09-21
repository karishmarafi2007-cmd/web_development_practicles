const express = require("express");

const app = express();

app.use(express.json());

function validateStudent(req, res, next) {

    if (!req.body.name) {

        return res.status(400).json({
            error: "Name is required"
        });

    }

    next();

}

app.post(
    "/student",
    validateStudent,
    (req, res) => {

        res.json({
            message: "Student is valid"
        });

    }
);

app.listen(3000);