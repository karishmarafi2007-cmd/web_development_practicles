const express = require("express");

const app1 = express();

const students =
    require("./routes/students");

app1.use("/students", students);

app1.listen(3000);