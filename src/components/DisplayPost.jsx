import { Link, NavLink, useOutletContext } from "react-router-dom";
import { BsPencilSquare, BsReply } from "react-icons/bs";
import Votes from "./Votes";
import { useEffect, useState } from "react";
import { API } from "../API";
import DeletePost from "./DeletePost";

export default function DisplayPost({ post }) {
  const { user, token, posts } = useOutletContext();
  const [children, setChildren] = useState([]);

  useEffect(() => {
    setChildren([]);
    if (post.children.length > 0) {
      for (let i = 0; i < post.children.length; i++) {
        fetchChild(post.children[i].id);
      }
    }
  }, [posts]);

  async function fetchChild(id) {
    const res = await fetch(`${API}/posts/${id}`);
    const info = await res.json();
    if (info.success) {
      setChildren((prevChildren) => [...prevChildren, info.post]);
      console.log(info.post);
    }
  }

  return (
    post && (
      <div key={post.id} className="post">
        <div key={post.id} className="flex">
          <Votes post={post} />
          <div key={post.id}>
            <h5>/{post.subreddit.name}/</h5>
            {<h2>{post.title}</h2>}
            <p>{post.text}</p>
            <h6 className="inline">by {post.user && post.user.username} </h6>
            {post.userId === user.id && (
              <button className="icon-button">
                <NavLink className="inline" to={`/post/${post.id}`}>
                  <BsPencilSquare />
                </NavLink>{" "}
              </button>
            )}
            {token && (
              <button className="icon-button">
                <Link to={`/reply/${post.id}`}>
                  <BsReply />
                </Link>
              </button>
            )}
            {post.userId === user.id && <DeletePost post={post} />}
            {post.children.length > 0 &&
              children.map((child) => {
                return <DisplayPost post={child} key={child.id} />;
              })}
          </div>
        </div>
      </div>
    )
  );
}
