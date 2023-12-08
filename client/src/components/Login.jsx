import { useState } from "react";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  return (
    <>
      <h1>Welcome to cursorPlay</h1>
      <p>Who are you?</p>
      <form onSubmit={(e) => onSubmit(e, username)}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
