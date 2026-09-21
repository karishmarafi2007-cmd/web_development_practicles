const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

// Users with different roles
const users = [
    {
        id: 1,
        username: "admin",
        role: "admin"
    },
    {
        id: 2,
        username: "karishma",
        role: "user"
    }
];

// Role authorization middleware
function authorizeRole(requiredRole) {

    return (req, res, next) => {

        const username = req.headers.username;

        const user = users.find(
            user => user.username === username
        );

        if (!user) {

            return res.status(401).json({
                message: "User not found"
            });

        }

        if (user.role !== requiredRole) {

            return res.status(403).json({
                message: "Access denied"
            });

        }

        req.user = user;

        next();
    };
}

// Admin-only route
app.get(
    "/admin",
    authorizeRole("admin"),
    (req, res) => {

        res.json({
            message: "Welcome Admin",
            user: req.user.username
        });

    }
);

// User route
app.get(
    "/user",
    authorizeRole("user"),
    (req, res) => {

        res.json({
            message: "Welcome User",
            user: req.user.username
        });

    }
);

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});