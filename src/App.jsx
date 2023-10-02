import { Outlet } from "react-router-dom";
import { API } from "./API/index.js";
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
    const res = await fetch(`${API}/subreddits`);
    const info = await res.json();
    setSubreddits(info.subreddits);
  }

  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);
    const info = await res.json();
    setPosts(info.posts);
  }

  useEffect(() => {
    fetchUser();
  }, [token]);

  useEffect(() => {
    fetchSubreddits();
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar user={user} token={token} setToken={setToken} setUser={setUser} />
      <div className="flex">
        <Subreddits subreddits={subreddits} />
        <Outlet
          context={{
            token,
            posts,
            subreddits,
            setToken,
            fetchPosts,
            user,
            fetchSubreddits,
          }}
        />
      </div>
    </div>
  );
}

export default App;
