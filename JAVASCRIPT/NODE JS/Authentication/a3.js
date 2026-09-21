const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();

const PORT = 3000;

app.use(express.json());

// Registration with password hashing
app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            message: "Username and password are required"
        });

    }

    // Generate password hash
    const hashedPassword =
        await bcrypt.hash(password, 10);

    console.log("Original Password:", password);
    console.log("Hashed Password:", hashedPassword);

    res.status(201).json({
        message: "User registered successfully",
        username: username,
        passwordHash: hashedPassword
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});