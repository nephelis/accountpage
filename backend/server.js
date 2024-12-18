const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Basit kullanıcı veritabanı (JSON dosyası)
const usersFile = "./users.json";

// Kullanıcıları oku
const getUsers = () => JSON.parse(fs.readFileSync(usersFile));

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.status(200).send({ message: "Login successful!" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

// Register Route
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  // Email kontrolü
  if (users.some((u) => u.email === email)) {
    return res.status(400).send({ message: "User already exists" });
  }

  // Yeni kullanıcı ekle
  users.push({ email, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.status(201).send({ message: "User registered successfully!" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
