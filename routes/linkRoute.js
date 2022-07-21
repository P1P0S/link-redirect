const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");

router.get("/all", linkController.allLinks);

router.get("/:title", linkController.redirect);

router.get("/", (req, res) => res.render("index", { error: false, body: {} }));

router.post(
  "/",
  express.urlencoded({ extended: true }),
  linkController.addLink
);

router.delete("/:id", linkController.deleteLink);

module.exports = router;
