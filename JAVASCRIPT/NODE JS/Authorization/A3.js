const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const users = [
    {
        username: "admin",
        role: "admin"
    },
    {
        username: "karishma",
        role: "user"
    }
];

// Authentication middleware
function identifyUser(req, res, next) {

    const username = req.headers.username;

    const user = users.find(
        user => user.username === username
    );

    if (!user) {

        return res.status(401).json({
            message: "User not found"
        });

    }

    req.user = user;

    next();
}

// Admin-only middleware
function adminOnly(req, res, next) {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Only admin can access this route"
        });

    }

    next();
}

// Admin route
app.get(
    "/delete-user",
    identifyUser,
    adminOnly,
    (req, res) => {

        res.json({
            message: "Admin can delete users"
        });

    }
);

// User route
app.get(
    "/profile",
    identifyUser,
    (req, res) => {

        res.json({
            message: "Profile accessed",
            username: req.user.username
        });

    }
);

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});