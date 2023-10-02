import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../API";

export default function CreatePost() {
  const { token, subreddits, fetchPosts } = useOutletContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [subredditId, setSubredditId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        text,
        subredditId,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    const path = subreddits.find(
      (subreddit) => subreddit.id === subredditId
    ).name;
    fetchPosts();
    navigate(`/${path}`);
  }

  return !token ? (
    <h1>Please log in to post</h1>
  ) : (
    <div className="flex-center">
      <div>
        <h2>Create a post</h2>
        <form className="flex-column" onSubmit={(e) => handleSubmit(e)}>
          <select
            onChange={(e) => setSubredditId(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select a subreddit to proceed
            </option>
            {subreddits.map((subreddit) => {
              return <option value={subreddit.id}>{subreddit.name}</option>;
            })}
          </select>
          <textarea
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            cols="60"
            rows="1"
            placeholder="Enter a title here..."
          ></textarea>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            cols="60"
            rows="10"
            placeholder="Enter your post here..."
          ></textarea>
          <button>Submit your post!</button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}
