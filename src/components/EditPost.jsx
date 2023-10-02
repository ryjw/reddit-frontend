import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { API } from "../API";

export default function EditPost() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { posts, fetchPosts, user, token } = useOutletContext();
  const [post, setPost] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const locatedPost = posts.find((post) => post.id === postId);
    if (locatedPost) {
      setPost(locatedPost);
      setTitle(locatedPost.title);
      setText(locatedPost.text);
    }
  }, [postId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${API}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });

    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    setPost({});
    fetchPosts();
    navigate(`/${post.subreddit.name}`);
  }

  return user.id !== post.userId ? (
    <h1 className="flex-center">Not authorised to edit</h1>
  ) : (
    <div className="flex-center">
      <div>
        <h2>Edit your post</h2>
        <form className="flex-column" onSubmit={(e) => handleSubmit(e)}>
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
            placeholder="Enter your text here..."
          ></textarea>
          <button>Submit the edit!</button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}
