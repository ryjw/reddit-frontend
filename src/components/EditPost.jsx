import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function EditPost() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { posts } = useOutletContext();
}
