const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(session({

    secret: "secret",
    resave: false,
    saveUninitialized: false

}));

app.get("/", (req, res) => {

    res.send(`
        <form method="POST" action="/login">

            <input name="username"
                   placeholder="Username">

            <input type="password"
                   name="password"
                   placeholder="Password">

            <button>Login</button>

        </form>
    `);

});

app.post("/login", (req, res) => {

    if (
        req.body.username === "admin" &&
        req.body.password === "1234"
    ) {

        req.session.username =
            req.body.username;

        res.send("Login successful.");

    }
    else {

        res.send("Invalid login.");

    }

});

app.get("/logout", (req, res) => {

    req.session.destroy();

    res.send("Logged out.");

});

app.listen(3000);