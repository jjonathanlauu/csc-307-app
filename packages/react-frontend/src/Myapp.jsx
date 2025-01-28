import React, { useState, useEffect } from "react";
import Table from "./table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const user = characters[index];
    if (!user || !user.id) {
      console.error("Error: Invalid user or user ID");
      return;
    }
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
    fetch(`http://localhost:8000/users/${user.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the user");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setCharacters(characters);
        alert("Failed to delete user. Please try again.");
      });
  }

  function updateList(person) {
    postUser(person)
      .then((newUser) => {
        setCharacters((prevCharacters) => [...prevCharacters, newUser]);
      })
      .catch((error) => {
        console.log(error);
        alert("User creation failed");
      });
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error(
          `Failed to create user with status code: ${response.status}`
        );
      }
    });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
