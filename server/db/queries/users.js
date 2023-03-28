const db = require("../../configs/db.config");
const bcrypt = require('bcryptjs');


// checks if username exists
const userExists = function (username, email) {
  const sql = `SELECT * FROM users WHERE username = $1 OR email = $2;`;
  return db
    .query(sql, [username, email])
    .then((result) => {
      return result.rows[0];
    })
};

const login = function (email, password) {
  return getUserByEmail(email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return res.status(400).send(error);
  })
}

const getAllUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getUserById = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1;", [id]).then((data) => {
    return data.rows[0];
  });
};

const getUserByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email = $1", [email]).then((data) => {
    return data.rows[0];
  });
};

const checkUsernameExists = (username) => {
  return db.query('SELECT id FROM users WHERE username = $1', [username]);
};

const checkEmailExists = (email) => {
  return db.query('SELECT id FROM users WHERE email = $1', [email]);
};

const addUser = (username, email, password, firstName, lastName) => {

  return bcrypt.hash(password, 10)
  .then((hashedPassword) => {
    return db
    .query('INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, hashedPassword, firstName, lastName]);
  });
};

const editUser = function (id, username, email, password, newPassword, firstName, lastName, profileUrl) {
  return getUserById(id)
  .then((user) => {
    if (bcrypt.compareSync(password,user.password)) {
      return bcrypt.hash(newPassword, 10)
    }
    throw new Error('Invalid password')
  })
  .then((hashedPassword) => {
    console.log("hashedPassword: ",hashedPassword)
    return db.query('UPDATE users SET username = $1, email = $2, password = $3, first_name = $4, last_name = $5, user_profile_picture = $6 WHERE id = $7 RETURNING *', [username, email, hashedPassword, firstName, lastName,profileUrl, id]);
  })
  .then((user) => {
    console.log("EditUser", user)
    return user.rows[0]
  })
  .catch((err) => {
    console.log(err)
  })
};


module.exports = { getAllUsers, getUserById, checkUsernameExists, checkEmailExists, addUser, userExists, getUserByEmail, login, editUser};
