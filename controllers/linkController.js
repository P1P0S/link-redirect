const Link = require("../models/Link");

const redirect = async (req, res, next) => {
  let title = req.params.title;
  try {
    let doc = await Link.findOne({ title });
    console.log(doc);
    if (doc) {
      res.redirect(doc.url);
    } else {
      next();
    }
  } catch (error) {
    res.send("Houve um erro");
  }
};

const allLinks = async (req, res) => {
  try {
    let docs = await Link.find({});
    res.render("all", { links: docs });
  } catch (error) {
    res.send("Houve um erro");
  }
};

const addLink = async (req, res) => {
  let link = new Link(req.body);

  try {
    await link.save();
    res.redirect("/");
  } catch (error) {
    res.render("index", { error, body: req.body });
  }
};

const deleteLink = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }
  try {
    await Link.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { redirect, addLink, allLinks, deleteLink };
