import { NavLink, useOutletContext } from "react-router-dom";
import EditPost from "./EditPost";

export default function DisplayPost({ post }) {
  const { user } = useOutletContext();
  return (
    <div className="post">
      {post.title && <h2>{post.title}</h2>}
      <p>{post.text}</p>
      <h6 className="inline">by {post.user && post.user.username} </h6>
      {post.userId === user.id && (
        <NavLink className="inline" to={`/post/${post.id}`}>
          ✏️
        </NavLink>
      )}
      {post.children &&
        post.children.map((child) => {
          return <DisplayPost post={child} />;
        })}
    </div>
  );
}
