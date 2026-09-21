const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = 3000;

const SECRET_KEY = "my_secret_key";

app.use(express.json());

// Temporary user database
let users = [];


// ===============================
// REGISTER
// ===============================

app.post("/register", async (req, res) => {

    const { username, password, role } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            message: "Username and password are required"
        });

    }

    // Check existing user
    const existingUser =
        users.find(user => user.username === username);

    if (existingUser) {

        return res.status(409).json({
            message: "Username already exists"
        });

    }

    // Only admin/user roles allowed
    const userRole =
        role === "admin" ? "admin" : "user";

    // Hash password
    const passwordHash =
        await bcrypt.hash(password, 10);

    const user = {

        id: users.length + 1,

        username: username,

        passwordHash: passwordHash,

        role: userRole

    };

    users.push(user);

    res.status(201).json({

        message: "User registered successfully",

        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }

    });

});


// ===============================
// LOGIN
// ===============================

app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    const user =
        users.find(user => user.username === username);

    if (!user) {

        return res.status(401).json({
            message: "Invalid username or password"
        });

    }

    // Verify password
    const passwordCorrect =
        await bcrypt.compare(
            password,
            user.passwordHash
        );

    if (!passwordCorrect) {

        return res.status(401).json({
            message: "Invalid username or password"
        });

    }

    // Create JWT
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
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


// ===============================
// JWT AUTHENTICATION MIDDLEWARE
// ===============================

function authenticateToken(req, res, next) {

    const authHeader =
        req.headers.authorization;

    const token =
        authHeader &&
        authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Token required"
        });

    }

    jwt.verify(
        token,
        SECRET_KEY,
        (error, user) => {

            if (error) {

                return res.status(403).json({
                    message: "Invalid or expired token"
                });

            }

            req.user = user;

            next();

        }
    );

}


// ===============================
// ROLE AUTHORIZATION MIDDLEWARE
// ===============================

function authorizeRole(requiredRole) {

    return (req, res, next) => {

        if (req.user.role !== requiredRole) {

            return res.status(403).json({
                message: "Access denied"
            });

        }

        next();

    };

}


// ===============================
// PROTECTED USER ROUTE
// ===============================

app.get(
    "/profile",
    authenticateToken,
    (req, res) => {

        res.json({

            message: "Profile accessed successfully",

            user: req.user

        });

    }
);


// ===============================
// ADMIN ONLY ROUTE
// ===============================

app.get(
    "/admin/users",
    authenticateToken,
    authorizeRole("admin"),
    (req, res) => {

        // Don't return password hashes
        const safeUsers =
            users.map(user => ({

                id: user.id,

                username: user.username,

                role: user.role

            }));

        res.json(safeUsers);

    }
);


// ===============================
// USER ONLY ROUTE
// ===============================

app.get(
    "/user/dashboard",
    authenticateToken,
    authorizeRole("user"),
    (req, res) => {

        res.json({

            message: "Welcome to User Dashboard",

            username: req.user.username

        });

    }
);


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `User REST API running at http://localhost:${PORT}`
    );

});