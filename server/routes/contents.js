const express = require("express");
const router = express.Router();
const contents = require("../db/queries/contents");

router.get("/", (req, res) => {
  contents.getAllContent().then((data) => {
    
    res.json({ contents: data });
  });
});

router.get("/dog/:id", (req, res) => {
  const dogId = req.params.id;
  contents.getContentByDogId(dogId).then((data) => {
    
    res.json({ contents: data });
  });
});

router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  contents.getContentByUserId(userId).then((data) => {
    
    res.json({ contents: data });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  contents.getContentById(id).then((data) => {
    // console.log(data);
    res.json({ contents: data });
  });
});

module.exports = router;
