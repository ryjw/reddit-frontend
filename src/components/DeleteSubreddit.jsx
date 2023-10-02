import { useNavigate } from "react-router-dom";
import { API } from "../API";
import { GoTrash } from "react-icons/go";

export default function DeleteSubreddit({ subreddit, token, fetchPosts }) {
  const navigate = useNavigate();

  async function handleDelete(e) {
    e.preventDefault();
    await fetch(`${API}/subreddits/${subreddit.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    navigate("/");
  }

  return (
    <button className="icon-button" onClick={(e) => handleDelete(e)}>
      <GoTrash />
    </button>
  );
}
