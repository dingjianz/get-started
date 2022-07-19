import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const path = require("path");
const __dirname = path.resolve();

const app = express();

app.use("/", express.static(path.join(__dirname, "dist/")));
app.use("/assets", express.static(path.join(__dirname, "dist/assets")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(9000);
