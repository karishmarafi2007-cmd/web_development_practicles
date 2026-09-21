const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

const PORT = 3000;

// Secret key
const SECRET_KEY = "my_secret_key";

app.use(express.json());


// Example user
let user = {
    id: 1,
    username: "karishma",
    passwordHash: ""
};


// Create hashed password
async function setupUser() {

    user.passwordHash =
        await bcrypt.hash("mypassword123", 10);

}

setupUser();


// LOGIN
app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    if (username !== user.username) {

        return res.status(401).json({
            message: "Invalid username"
        });

    }

    const passwordCorrect =
        await bcrypt.compare(
            password,
            user.passwordHash
        );

    if (!passwordCorrect) {

        return res.status(401).json({
            message: "Invalid password"
        });

    }

    // Create JWT token
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Login successful",
        token: token
    });

});


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});