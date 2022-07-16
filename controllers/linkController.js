const Link = require("../models/Link");

const redirect = async (req, res) => {
  let title = req.params.title;
  try {
    let doc = await Link.findOne({ title });
    console.log(doc);
    res.redirect(doc.url);
  } catch (error) {
    res.send("Houve um erro");
  }
};

const addLink = async (req, res) => {
  let link = new Link(req.body);

  try {
    await link.save();
    res.send("Link adicionado com sucesso!");
  } catch (error) {
    res.send(error);
  }
};

module.exports = { redirect, addLink };
