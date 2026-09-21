const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Karishma",
        email: "karishma@example.com"
    }
];

// CREATE USER
app.post("/users", (req, res) => {

    const { name, email } = req.body;

    const user = {
        id: Date.now(),
        name,
        email
    };

    users.push(user);

    res.status(201).json({
        message: "User created successfully",
        user
    });

});

// READ USERS
app.get("/users", (req, res) => {

    res.json(users);

});

// UPDATE USER
app.put("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {

        return res.status(404).json({
            message: "User not found"
        });

    }

    user.name = req.body.name;
    user.email = req.body.email;

    res.json({
        message: "User updated successfully",
        user
    });

});

// DELETE USER
app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const index =
        users.findIndex(u => u.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "User not found"
        });

    }

    users.splice(index, 1);

    res.json({
        message: "User deleted successfully"
    });

});

app.listen(PORT, () => {

    console.log(
        `User Management App running at http://localhost:${PORT}`
    );

});