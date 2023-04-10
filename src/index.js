import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Post, { postLoader } from "./routes/post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Post />,
    loader: postLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
