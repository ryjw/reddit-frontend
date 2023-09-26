export default function DisplayPost({ post, subreddits }) {
  return (
    <div className="post">
      {post.title && <h2>{post.title}</h2>}
      <p>{post.text}</p>
      {post.children &&
        post.children.map((child) => {
          return <DisplayPost post={child} />;
        })}
    </div>
  );
}
