const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

const PORT = 3000;

const SECRET_KEY = "my_secret_key";

app.use(express.json());


// User
let user = {
    id: 1,
    username: "karishma",
    passwordHash: ""
};


// Create password hash
async function setupUser() {

    user.passwordHash =
        await bcrypt.hash("mypassword123", 10);

}

setupUser();


// LOGIN ROUTE
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

    // Generate JWT
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


// AUTHENTICATION MIDDLEWARE
function authenticateToken(req, res, next) {

    // Get Authorization header
    const authHeader =
        req.headers["authorization"];

    // Extract token
    const token =
        authHeader && authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Access denied. Token required."
        });

    }

    // Verify token
    jwt.verify(
        token,
        SECRET_KEY,
        (error, decoded) => {

            if (error) {

                return res.status(403).json({
                    message: "Invalid or expired token"
                });

            }

            // Store decoded user information
            req.user = decoded;

            next();

        }
    );

}


// PROTECTED ROUTE
app.get(
    "/profile",
    authenticateToken,
    (req, res) => {

        res.json({
            message: "You accessed a protected route",
            user: req.user
        });

    }
);


// ANOTHER PROTECTED ROUTE
app.get(
    "/dashboard",
    authenticateToken,
    (req, res) => {

        res.json({
            message: "Welcome to the protected dashboard",
            username: req.user.username
        });

    }
);


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});