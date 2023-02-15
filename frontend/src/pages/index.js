import { useState } from "react";
import io from "socket.io-client";
import jwt from "jsonwebtoken";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const socket = io("http://localhost:3000", { withCredentials: true });

    // Create a JWT token
    const token = jwt.sign({}, "mysecretkey");

    socket.emit(
      "register",
      { username, email, password, token },
      { credentials: "include" },
      (response) => {
        console.log(response);
        socket.close();
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterUser;
