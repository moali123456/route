const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;
const FILE_PATH = "./users.json";

function readUsers() {
  const data = fs.readFileSync(FILE_PATH, "utf8");
  return JSON.parse(data);
}

function writeUsers(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // POST /user
  if (method === "POST" && path === "/user") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);

      const data = readUsers();

      const emailExists = data.users.find(
        user => user.email === newUser.email
      );

      if (emailExists) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            message: "Email already exists"
          })
        );
      }

      newUser.id = Date.now();

      data.users.push(newUser);

      writeUsers(data);

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify({
          message: "User Added Successfully",
          user: newUser
        })
      );
    });

    return;
  }

  // GET /user
  if (method === "GET" && path === "/user") {

    const data = readUsers();

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify(data.users));
  }

  // GET /user/:id
  if (method === "GET" && path.startsWith("/user/")) {

    const id = Number(path.split("/")[2]);

    const data = readUsers();

    const user = data.users.find(user => user.id === id);

    if (!user) {

      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      return res.end(
        JSON.stringify({
          message: "User Not Found"
        })
      );
    }

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify(user));
  }

  // PATCH /user/:id
  if (method === "PATCH" && path.startsWith("/user/")) {

    const id = Number(path.split("/")[2]);

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      const updates = JSON.parse(body);

      const data = readUsers();

      const user = data.users.find(user => user.id === id);

      if (!user) {

        res.writeHead(404, {
          "Content-Type": "application/json"
        });

        return res.end(
          JSON.stringify({
            message: "User Not Found"
          })
        );
      }

      if (updates.email) {

        const emailExists = data.users.find(
          u => u.email === updates.email && u.id !== id
        );

        if (emailExists) {

          res.writeHead(400, {
            "Content-Type": "application/json"
          });

          return res.end(
            JSON.stringify({
              message: "Email already exists"
            })
          );
        }
      }

      user.name = updates.name || user.name;
      user.age = updates.age || user.age;
      user.email = updates.email || user.email;

      writeUsers(data);

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify({
          message: "User Updated Successfully",
          user
        })
      );

    });

    return;
  }

  // DELETE /user/:id
  if (method === "DELETE" && path.startsWith("/user/")) {

    const id = Number(path.split("/")[2]);

    const data = readUsers();

    const index = data.users.findIndex(user => user.id === id);

    if (index === -1) {

      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      return res.end(
        JSON.stringify({
          message: "User Not Found"
        })
      );
    }

    data.users.splice(index, 1);

    writeUsers(data);

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(
      JSON.stringify({
        message: "User Deleted Successfully"
      })
    );
  }

  res.writeHead(404, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      message: "Route Not Found"
    })
  );

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});