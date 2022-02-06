const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = class UserController {
  static getAllUsers(req, res) {
    User.find().then(function (users) {
      res.send(users);
    });
  }

  static getActiveUser(req, res) {
    const id = req.params.id;
    Article.findById(id).then(function (user) {
      res.send(user);
    });
  }

  static register(req, res) {
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }

      User.create(
        { mail: mail, name: name, password: hash },
        function (err, reponse) {
          if (err) {
            console.log(err);
          } else {
            res.send("Data ajoutée");
          }
        }
      );
    });
  }

  static async login(req, res) {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail });

    if (!user) {
      res.json({ error: "Pas d'utilisateur avec ce mail" });
    } else {
      bcrypt.compare(password, user.password, (error, response) => {
        if (response) {
          console.log(response);
        } else {
          console.log(error);
        }
      });
      const accessToken = jwt.sign(
        { name: user.name, id: user._id },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      res.json(accessToken);
    }
  }

  static async postsByUser(req, res) {
    const { id } = req.params;

    console.log(id);
    const user = await User.findById(id).populate("articles");

    console.log(user);

    console.log(user.articles);

    res.send(user.articles);
  }
};
