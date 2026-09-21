const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/students", (req, res) => {

    const { name, age, course } = req.body;

    // Validate name
    if (!name || name.trim() === "") {

        return res.status(400).json({
            message: "Name is required"
        });

    }

    // Validate age
    if (!age || isNaN(age)) {

        return res.status(400).json({
            message: "Age must be a number"
        });

    }

    // Validate age range
    if (age < 16 || age > 100) {

        return res.status(400).json({
            message: "Age must be between 16 and 100"
        });

    }

    // Validate course
    if (!course || course.trim() === "") {

        return res.status(400).json({
            message: "Course is required"
        });

    }

    res.status(201).json({
        message: "Validation successful",
        student: {
            name,
            age,
            course
        }
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});