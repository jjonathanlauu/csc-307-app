import express from "express";

const app = express();
const port = 8000;

// Users data
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

// Helper function to find users by name
const findUserByName = (name) => {
  return users.users_list.filter((user) => user.name === name);
};

// Route to get all users or users by name
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.json(result);
  } else {
    res.json(users);
  }
});

// Root route handler
app.get("/", (req, res) => {
  res.send("Hello World! Welcome to the Express server.");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
