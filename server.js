const express = require("express");
const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('.'));

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
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("error ====> ", err);
  } else {
    console.log("Server started at PORT: " + PORT);
  }
});
