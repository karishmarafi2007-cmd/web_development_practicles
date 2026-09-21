const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

// Temporary user storage
let users = [];

// Registration route
app.post("/register", (req, res) => {

    const { username, password } = req.body;

    // Check whether fields are provided
    if (!username || !password) {

        return res.status(400).json({
            message: "Username and password are required"
        });

    }

    // Check whether username already exists
    const existingUser =
        users.find(user => user.username === username);

    if (existingUser) {

        return res.status(409).json({
            message: "Username already exists"
        });

    }

    // Store user
    const newUser = {
        id: users.length + 1,
        username: username,
        password: password
    };

    users.push(newUser);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser.id,
            username: newUser.username
        }
    });

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});