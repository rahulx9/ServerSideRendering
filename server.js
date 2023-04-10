const express = require("express");
const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config.js");
let fsp = require("fs/promises");
require("@babel/register");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("."));

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err || stats.compilation.errors);
  }

  console.log(
    stats.toString({
      colors: true,
      modules: false,
      chunks: false,
      children: false,
      version: false,
      hash: false,
      timings: false,
      assets: false,
      reasons: false,
      source: false,
      warnings: false,
      errors: true,
      errorDetails: false,
    })
  );

  app.get("*", async (req, res) => {
    try {
      let template = await fsp.readFile(
        path.resolve(__dirname, "build/index.html"),
        "utf8"
      );
      const render = require(path.resolve(
        __dirname,
        "src/entry.server.js"
      )).render;
      let appHtml = await render(req);
      let html = template.replace(
        '<div id="root">',
        '<div id="root">' + appHtml
      );
      res.setHeader("Content-Type", "text/html");
      return res.status(200).end(html);
    } catch (error) {
      console.log("error   ================> ", error);
      return res.status(500).end("");
    }
  });

  app.listen(PORT, (err) => {
    if (err) {
      console.log("error ====> ", err);
    } else {
      console.log("Server started at PORT: " + PORT);
    }
  });
});
