import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "./routes";
import { createFetchRequest } from "./utils/createFetchRequest";
import { ServerStyleSheet } from "styled-components";

export async function render(request) {
  try {
    let { query, dataRoutes } = createStaticHandler(routes);
    let remixRequest = await createFetchRequest(request);
    let context = await query(remixRequest);

    if (context instanceof Response) {
      throw context;
    }

    let router = createStaticRouter(dataRoutes, context);
    const sheet = new ServerStyleSheet();
    const styles = sheet.getStyleTags();

    return ReactDOMServer.renderToString(
      sheet.collectStyles(
        <React.StrictMode>
          <div>{styles}</div>
          <StaticRouterProvider router={router} context={context} />
        </React.StrictMode>
      )
    );
  } catch (error) {
    console.log("error render", error);
    return "";
  }
}
