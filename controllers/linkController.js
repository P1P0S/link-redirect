const Link = require("../models/Link");

const redirect = async (req, res, next) => {
  let id = req.params.id;
  try {
    if (id == "add") {
      console.log("pao");
      next();
    } else {
      let doc = await Link.findById(id);
      res.redirect(doc.url);
    }
  } catch (error) {
    res.send("Oops, an error has occurred!");
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

const loadLink = async (req, res) => {
  let id = req.params.id;
  try {
    let doc = await Link.findById(id);
    res.render("edit", { error: false, body: doc });
  } catch (error) {
    res.status(404).send(error);
  }
};

const editLink = async (req, res) => {
  let link = {};
  link.title = req.body.title;
  link.description = req.body.description;
  link.url = req.body.url;

  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }
  try {
    let doc = await Link.findByIdAndUpdate(id, link);
    res.redirect("/");
  } catch (error) {
    res.render("edit", { error, body: req.body });
  }
};

module.exports = {
  redirect,
  addLink,
  allLinks,
  deleteLink,
  loadLink,
  editLink,
};
