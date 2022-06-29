const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
});

//(L)ink = model/collection, (l)ink = document
const Link = mongoose.model("Link", linkSchema);

//fictitious values
let link = new Link({
  title: "Pipos",
  description: "Link para o youtube",
  url: "https://youtube.com",
});

//insert values on db
link
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

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
