import { useOutletContext } from "react-router-dom";
import { API } from "../API";
import { GoTrash } from "react-icons/go";

export default function DeletePost({ post }) {
  const { fetchPosts, token } = useOutletContext();
  async function handleDeletePost(e) {
    e.preventDefault();
    await fetch(`${API}/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
  }

  return (
    <button className="icon-button" onClick={(e) => handleDeletePost(e)}>
      <GoTrash />
    </button>
  );
}
