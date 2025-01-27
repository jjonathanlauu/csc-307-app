import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.users_list.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found.");
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const initialLength = users.users_list.length;
  users.users_list = users.users_list.filter((user) => user.id !== id);
  if (users.users_list.length === initialLength) {
    res.status(404).send("User not found.");
  } else {
    res.status(200).send("User deleted.");
  }
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let results = users.users_list;
  if (name) {
    results = results.filter((user) => user.name === name);
  }
  if (job) {
    results = results.filter((user) => user.job === job);
  }
  res.json({ users_list: results });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
