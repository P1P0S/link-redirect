const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const linkRoute = require("./routes/linkRoute");

mongoose.connect("mongodb://localhost/links", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", () => console.log("Houve algum erro"));
db.once("open", () => console.log("Banco de dados carregado!"));

app.use("/", linkRoute);

app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
