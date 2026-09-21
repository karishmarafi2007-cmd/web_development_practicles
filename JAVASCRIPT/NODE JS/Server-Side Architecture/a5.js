const os = require("os");
const path = require("path");

console.log("Operating System:", os.platform());

console.log("Home Directory:", os.homedir());

console.log(
    "Joined Path:",
    path.join("students", "data", "file.txt")
);