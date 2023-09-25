import { Outlet } from "react-router-dom";
import { API } from "./API/index";
import Navbar from "./components/Navbar";
import Subreddits from "./components/Subreddits";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [subreddits, setSubreddits] = useState([]);
  const [posts, setPosts] = useState([]);

  async function fetchUser() {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
    if (!token) {
      return;
    }
    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (info.success) {
      setUser(info.user);
    }
  }

  async function fetchSubreddits() {
    fetch(`${API}/subreddits/`);
  }

  useEffect(() => {
    fetchUser();
  }, [token]);

  useEffect(() => {
    fetchSubreddits();
  }, []);

  return (
    <div>
      <Navbar user={user} setToken={setToken} />
      <div className="flex">
        <Subreddits subreddits={subreddits} />
        <Outlet context={(token, posts)} />
      </div>
    </div>
  );
}

export default App;
