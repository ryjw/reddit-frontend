import { useState } from "react";
import { API } from "../API";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function CreateSubreddit() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { token, fetchSubreddits } = useOutletContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${API}/subreddits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    setName("");
    fetchSubreddits();
    navigate("/");
  }

  return !token ? (
    <div className="flex-center">
      <div>
        <h1>Please log in to create a subreddit</h1>
      </div>
    </div>
  ) : (
    <div className="flex-center">
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the name here"
          />
          <button>Submit</button>
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
}
