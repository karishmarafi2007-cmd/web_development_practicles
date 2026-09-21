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
function authenticate(req, res, next) {

    const username = req.headers.username;

    const user = users.find(
        user => user.username === username
    );

    if (!user) {

        return res.status(401).json({
            message: "Authentication failed"
        });

    }

    req.user = user;

    next();
}

// Authorization middleware
function authorize(requiredRole) {

    return (req, res, next) => {

        if (req.user.role !== requiredRole) {

            return res.status(403).json({
                message: "You are not authorized"
            });

        }

        next();

    };
}

// Admin route
app.get(
    "/admin-dashboard",
    authenticate,
    authorize("admin"),
    (req, res) => {

        res.json({
            message: "Admin Dashboard"
        });

    }
);

// User route
app.get(
    "/user-dashboard",
    authenticate,
    authorize("user"),
    (req, res) => {

        res.json({
            message: "User Dashboard"
        });

    }
);

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});