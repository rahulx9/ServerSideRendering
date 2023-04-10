import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "./routes";
import { createFetchRequest } from "./utils/createFetchRequest";

export async function render(request) {
  try {
    let { query, dataRoutes } = createStaticHandler(routes);
    let remixRequest = await createFetchRequest(request);
    let context = await query(remixRequest);

    if (context instanceof Response) {
      throw context;
    }

    let router = createStaticRouter(dataRoutes, context);
    return ReactDOMServer.renderToString(
      <React.StrictMode>
        <StaticRouterProvider router={router} context={context} />
      </React.StrictMode>
    );
  } catch (error) {
    console.log("error render", error);
    return "";
  }
}

