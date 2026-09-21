const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();

const PORT = 3000;

app.use(express.json());


// Example stored user
let user = {
    username: "karishma",
    passwordHash: ""
};


// Create password hash when server starts
async function createUser() {

    user.passwordHash =
        await bcrypt.hash("mypassword123", 10);

    console.log("User password hash created");

}

createUser();


// PASSWORD VERIFICATION
app.post("/verify-password", async (req, res) => {

    const { password } = req.body;

    if (!password) {

        return res.status(400).json({
            message: "Password is required"
        });

    }

    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.passwordHash
        );

    if (isPasswordCorrect) {

        res.json({
            message: "Password verified successfully"
        });

    } else {

        res.status(401).json({
            message: "Incorrect password"
        });

    }

});


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});