# ⚙️ Backend - Mini Banking System

## 📌 Description

The backend connects the frontend with the C-based banking logic using Node.js.

---

## 💡 Features

* Handles API requests
* Executes C program using child process
* Returns output to frontend
* Manages communication between layers

---

## 🛠 Technologies Used

* Node.js
* Express.js
* Child Process Module
* C Program (bank.c)

---

## 🚀 How to Run

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
node server.js
```

---

## 📌 Important

* Ensure `bank.exe` is present in the backend folder
* Ensure `accounts.txt` is available

---

## 📡 API Endpoints

* POST /create
* POST /deposit
* POST /withdraw
* GET /balance/:accNo
* GET /display
* GET /history
* POST /undo
