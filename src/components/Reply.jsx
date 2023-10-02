import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../API";

export default function Reply() {
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const { fetchPosts, posts, token } = useOutletContext();
  const { postId } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const post = posts.find((post) => post.id == postId);
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        subredditId: post.subreddit.id,
        parentId: postId,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }

    fetchPosts();
    navigate(`/${post.subreddit.name}`);
  }

  return !token ? (
    <h1>Please log in to reply</h1>
  ) : (
    <div className="flex-center">
      <div>
        <h2>Make your reply</h2>
        <form className="flex-column" onSubmit={(e) => handleSubmit(e)}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            cols="60"
            rows="10"
            placeholder="Enter your reply here..."
          ></textarea>
          <button>Submit your reply!</button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}
