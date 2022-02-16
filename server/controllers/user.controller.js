const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

    bcrypt.hash(password, 10, (err, hash) => {
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
      bcrypt.compare(password, user.password, function (error, response) {
        console.log(password, user.password, error, response);
        if (response) {
          const accessToken = jwt.sign(
            { name: user.name, mail: user.mail, id: user._id },
            process.env.JWT_SECRET_TOKEN,
            {
              expiresIn: "3h",
            }
          );
          res.status(200).json(accessToken);
        } else {
          res.json({ error: "Mauvais mot de passe" });
        }
      });
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

  static async reviewsByUser(req, res) {
    const { id } = req.params;

    console.log(id);
    const user = await User.findById(id).populate("reviews");

    console.log(user);

    console.log(user.reviews);

    res.send(user.reviews);
  }
};
