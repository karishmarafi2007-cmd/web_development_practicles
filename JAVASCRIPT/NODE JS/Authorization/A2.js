const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const users = [
    {
        id: 1,
        name: "Admin User",
        username: "admin",
        role: "admin"
    },
    {
        id: 2,
        name: "Karishma",
        username: "karishma",
        role: "user"
    }
];

// Display all users
app.get("/users", (req, res) => {

    res.json(users);

});

// Admin information
app.get("/admin", (req, res) => {

    const admins =
        users.filter(user => user.role === "admin");

    res.json(admins);

});

// Normal users
app.get("/normal-users", (req, res) => {

    const normalUsers =
        users.filter(user => user.role === "user");

    res.json(normalUsers);

});

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});