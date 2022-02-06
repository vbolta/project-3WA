const Frame = require("../models/frame.model");
const jwt = require("jsonwebtoken");

module.exports = class FrameController {
  static createOneOrder(req, res) {
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
  static getOneArticle(req, res) {
    const id = req.params.id;
    Article.findById(id).then(function (article) {
      res.send(article);
    });
  }

  static getRandomArticles(req, res) {
    const limit = 4; // Display four random articles
    User.find().then(function (result) {
      const randomize = result.sort(() => 0.5 - Math.random());
      let randomArticles = randomize.slice(0, limit);
      res.send(randomArticles);
    });
  }

  static addOneArticle(req, res) {
    const { id, name } = jwt.verify(req.headers.accesstoken, "secret");
    const title = req.body.title;
    const content = req.body.content;
    const author = {
      id: id,
      name: name,
    };

    const url = req.protocol + "://" + req.get("host");
    Article.create(
      {
        title: title,
        picture: url + "/images/" + req.file.filename,
        author: author,
        content: content,
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send("Article ajoutée");
        }
      }
    );
  }

  static async userByPost(req, res) {
    const { id } = req.params;
    const userByPost = await Post.findById(id).populate("user");
    res.send(userByPost);
  }
};
