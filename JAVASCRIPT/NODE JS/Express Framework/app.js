const express = require("express");

const app = express();

const studentRoutes =
    require("./routes/students");

app.use("/students", studentRoutes);

app.listen(3000, () => {

    console.log("Server running");

});