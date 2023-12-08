import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [username, setUsername] = useState("");
  const onSubmit = (e, username) => {
    e.preventDefault();
    setUsername(username);
  };

  return (
    <>
      {username ? <Home username={username} /> : <Login onSubmit={onSubmit} />}
    </>
  );
}

export default App;
