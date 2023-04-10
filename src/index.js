import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const browserRouter = createHashRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <RouterProvider router={browserRouter} />
);
