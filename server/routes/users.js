const express = require("express");
const router = express.Router();
const users = require("../db/queries/users");

router.get("/", (req, res) => {
  users.getAllUsers().then((data) => {
    res.json({ users: data });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  users.getUserById(id).then((data) => {
    console.log(data);
    res.json({ users: data });
  });
});

router.post("/:id", (req, res) => {
  console.log(req.body)
  const { username, email, firstName, lastName, password, newPassword, profileUrl } = req.body;

  users
    .getUserById(req.params.id)
    .then((userExists) => {
        return users.editUser(req.params.id, username, email, password, newPassword, firstName, lastName, profileUrl);
      
    })
    .then((user) => {
      console.log('User updated:', user);
      const updatedUser = user;
      return res.status(200).send({ user: updatedUser, message: 'User successfully updated' });
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send({ error: error.message });
    });
});


module.exports = router;
