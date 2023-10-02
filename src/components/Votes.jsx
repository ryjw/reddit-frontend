import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { API } from "../API";
import { useOutletContext } from "react-router-dom";

export default function Votes({ post }) {
  const { token, fetchPosts } = useOutletContext();
  async function handleUpvote() {
    const res = await fetch(`${API}/votes/upvotes/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (!info.success) {
      console.log(info);
      deleteUpvote();
      return fetchPosts();
    }
    fetchPosts();
  }
  async function handleDownvote() {
    const res = await fetch(`${API}/votes/downvotes/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (!info.success) {
      deleteDownvote();
      return fetchPosts();
    }
    fetchPosts();
  }
  async function deleteUpvote() {
    await fetch(`${API}/votes/upvotes/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
  }
  async function deleteDownvote() {
    await fetch(`${API}/votes/downvotes/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
  }

  return (
    token && (
      <div className="flex-column votes">
        <button
          onClick={() => {
            handleUpvote();
            deleteDownvote();
            fetchPosts();
          }}
        >
          <FiArrowUpCircle />
        </button>
        <div>
          {post.upvotes &&
            post.downvotes &&
            post.upvotes.length - post.downvotes.length}
        </div>
        <button
          onClick={() => {
            handleDownvote();
            deleteUpvote();
            fetchPosts();
          }}
        >
          <FiArrowDownCircle />
        </button>
      </div>
    )
  );
}
