const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/links", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", () => {
  console.log("Houve algum erro");
});

db.once("open", () => {
  console.log("Banco de dados carregado!");
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
