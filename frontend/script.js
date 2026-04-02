const baseUrl = "http://localhost:8080";

// 🔹 Loader functions
function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

// 🔹 Clear fields (smart)
function clearFields(type) {
  if (type === "create") {
    document.getElementById("name").value = "";
  }

  document.getElementById("amount").value = "";
  document.getElementById("id").value = "";
}

// 🔹 Create Account
function createAccount() {
  showLoader();

  fetch(baseUrl + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      balance: document.getElementById("amount").value
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerText =
      "✅ Account Created! ID: " + data.id;

    clearFields("create");
    hideLoader();
  })
  .catch(err => {
    document.getElementById("result").innerText =
      "❌ Error creating account";
    hideLoader();
  });
}

// 🔹 Deposit
function deposit() {
  showLoader();

  fetch(baseUrl + "/deposit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: document.getElementById("id").value,
      balance: document.getElementById("amount").value
    })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("result").innerText =
      "✅ " + data;

    clearFields();
    hideLoader();
  })
  .catch(err => {
    document.getElementById("result").innerText =
      "❌ Deposit failed";
    hideLoader();
  });
}

// 🔹 Withdraw
function withdraw() {
  showLoader();

  fetch(baseUrl + "/withdraw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: document.getElementById("id").value,
      balance: document.getElementById("amount").value
    })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("result").innerText =
      "✅ " + data;

    clearFields();
    hideLoader();
  })
  .catch(err => {
    document.getElementById("result").innerText =
      "❌ Withdraw failed";
    hideLoader();
  });
}

// 🔹 Check Balance
function checkBalance() {
  showLoader();

  const id = document.getElementById("id").value;

  fetch(baseUrl + "/balance/" + id)
    .then(res => res.text())
    .then(data => {
      document.getElementById("result").innerText =
        "💰 Balance: ₹" + data;

      clearFields();
      hideLoader();
    })
    .catch(err => {
      document.getElementById("result").innerText =
        "❌ Failed to fetch balance";
      hideLoader();
    });
}