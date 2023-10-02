import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Subreddit from "./components/Subreddit.jsx";
import NotFound from "./components/NotFound.jsx";
import CreatePost from "./components/CreatePost.jsx";
import EditPost from "./components/EditPost.jsx";
import CreateSubreddit from "./components/CreateSubreddit.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Reply from "./components/Reply.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "/", element: <Home /> },
      { path: "post", element: <CreatePost /> },
      { path: "createsubreddit", element: <CreateSubreddit /> },
      { path: "reply/:postId", element: <Reply /> },
      { path: "post/:postId", element: <EditPost /> },
      { path: ":subredditName", element: <Subreddit /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
