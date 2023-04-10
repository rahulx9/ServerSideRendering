import React from "react";
import Post, { postLoader } from "./routes/post.js";

export const routes = [
  {
    path: "/",
    element: <Post />,
    loader: postLoader,
  },
];
