const url = "http://localhost:3000";

function createAccount() {
    fetch(url + "/create", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            accNo: document.getElementById("accNo").value,
            name: document.getElementById("name").value,
            balance: document.getElementById("balance").value
        })
    })
    .then(res => res.text())
    .then(data => show(data));
}

function deposit() {
    fetch(url + "/deposit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            accNo: document.getElementById("accNo").value,
            amount: document.getElementById("amount").value
        })
    })
    .then(res => res.text())
    .then(data => show(data));
}

function withdraw() {
    fetch(url + "/withdraw", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            accNo: document.getElementById("accNo").value,
            amount: document.getElementById("amount").value
        })
    })
    .then(res => res.text())
    .then(data => show(data));
}

function checkBalance() {
    const accNo = document.getElementById("accNo").value;

    fetch(url + "/balance/" + accNo)
    .then(res => res.text())
    .then(data => show(data));
}

function showAll() {
    fetch(url + "/display")
    .then(res => res.text())
    .then(data => show(data));
}

function history() {
    fetch(url + "/history")
    .then(res => res.text())
    .then(data => show(data));
}

function undo() {
    fetch(url + "/undo", { method: "POST" })
    .then(res => res.text())
    .then(data => show(data));
}

function show(data) {
    document.getElementById("output").innerText = data;
}