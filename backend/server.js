const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Helper function
function runCommand(command, res) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.send("Error: " + error.message);
            return;
        }
        if (stderr) {
            res.send("Error: " + stderr);
            return;
        }
        res.send(stdout);
    });
}

// ---------------- ROUTES ----------------

app.post("/create", (req, res) => {
    const { accNo, name, balance } = req.body;
    runCommand(`bank create ${accNo} ${name} ${balance}`, res);
});

app.post("/deposit", (req, res) => {
    const { accNo, amount } = req.body;
    runCommand(`bank deposit ${accNo} ${amount}`, res);
});

app.post("/withdraw", (req, res) => {
    const { accNo, amount } = req.body;
    runCommand(`bank withdraw ${accNo} ${amount}`, res);
});

app.get("/balance/:accNo", (req, res) => {
    runCommand(`bank balance ${req.params.accNo}`, res);
});

app.get("/display", (req, res) => {
    runCommand(`bank display`, res);
});

app.get("/history", (req, res) => {
    runCommand(`bank history`, res);
});

app.post("/undo", (req, res) => {
    runCommand(`bank undo`, res);
});

// ---------------- START SERVER ----------------

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});