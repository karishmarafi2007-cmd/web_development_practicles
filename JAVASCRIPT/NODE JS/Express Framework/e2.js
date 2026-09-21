const express = require("express");

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {

    res.send(`
        <form method="POST">
            <input name="name"
                   placeholder="Enter name">

            <button type="submit">
                Submit
            </button>
        </form>
    `);

});

app.post("/", (req, res) => {

    res.send(
        "Hello " + req.body.name
    );

});

app.listen(3000, () => {

    console.log("Server running");

});