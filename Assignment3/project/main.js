const fs = require("fs");
const express = require("express");
const { write } = require("node:fs");
const app = express();
const port = 3000;
app.use(express.json());

// 1- Add new user
app.post("/user", (req, res, next) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  const { name, age, email } = req.body;

  const userExist = users.find((user) => user.email === email);

  if (userExist) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    age,
    email,
  };

  users.push(newUser);

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});

// 2- Update user
app.patch("/user/:id", (req, res, next) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  const id = Number(req.params.id);

  const { name, age, email } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (name) user.name = name;
  if (age) user.age = age;
  if (email) user.email = email;

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  res.json({
    message: "User updated successfully",
    user,
  });
});

// 3- Delete user
app.delete("/user/:id", (req, res, next) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  const id = Number(req.params.id);

  const newUsers = users.filter((user) => user.id !== id);

  if (users.length === newUsers.length) {
    return res.status(404).json({ message: "User not found" });
  }

  fs.writeFileSync("./users.json", JSON.stringify(newUsers, null, 2));

  res.json({
    message: "User deleted successfully",
  });
});

// 4- Get user by name
app.get("/user/getByName", (req, res, next) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  const { name } = req.query;

  const user = users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase(),
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// 5- Get All Users
app.get("/user", (req, res, next) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  res.status(200).json({
    message: "Users retrieved successfully",
    users,
  });
});

// 6- Filter Users by Minimum Age
app.get("/user/filter", (req, res, next) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  const age = Number(req.query.age);

  const filteredUsers = users.filter((user) => user.age >= age);

  res.status(200).json({
    message: "Filtered users retrieved successfully",
    users: filteredUsers,
  });
});

// 7- Get User By ID
app.get("/user/:id", (req, res, next) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    message: "User retrieved successfully",
    user,
  });
});

app.all("{/*dummy}", (req, res, next) => {
  res.write("Invalid app routing");
  res.end();
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message, error, stack: error.stack });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
