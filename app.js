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

  //find object in document on param request
  app.get("/:title", async (req, res) => {
    //get value after /
    let title = req.params.title;
    try {
      let doc = await Link.findOne({ title });
      console.log(doc);
      res.redirect(doc.url);
    } catch (error) {
      res.send(error);
    }
  });
});
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
