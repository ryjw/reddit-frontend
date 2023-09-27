import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../API";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await res.json();
    if (info.success) {
      setToken(info.token);
      localStorage.setItem("token", info.token);
      navigate("/");
    } else {
      setError(info.error);
      consol;
    }
  }
  return (
    <div className="flex-center">
      <div>
        <form
          className="form"
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div className="input-container">
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              value={username}
            />
          </div>
          <div className="input-container">
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              value={password}
            />
          </div>
          <div className="button-container">
            <button>Login</button>
          </div>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}
