const Article = require("../models/article.model");
const jwt = require("jsonwebtoken");

module.exports = class ArticleController {
  static getAllArticles(req, res) {
    Article.find().then(function (articles) {
      res.send(articles);
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
    const { id, name, mail } = jwt.verify(
      req.headers.accesstoken,
      process.env.JWT_secret_Token
    );
    const title = req.body.title;
    const content = req.body.content;
    const author = {
      id: id,
      name: name,
      mail: mail,
    };
    const photo = req.file
      ? req.file.filename
      : res.status(400).json({ error: "Veuillez ajouter une image" });

    const date = new Date();

    const url = req.protocol + "://" + req.get("host");
    Article.create(
      {
        title: title,
        picture: url + "/images/" + photo,
        author: author,
        content: content,
        data: date.toISOString(),
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // console.log(result);
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

  static async updateArticle(req, res) {
    const id = req.body.id;
    const newTitle = req.body.title;
    const newContent = req.body.content;
    let photo;
    if (!req.file) {
      res.json({ error: "Veuillez ajouter une image" });
    } else {
      photo = req.file.filename;
    }

    const url = req.protocol + "://" + req.get("host");

    await Article.findByIdAndUpdate(id, {
      title: newTitle,
      content: newContent,
      picture: url + "/images/" + photo,
    });
    res.json("Article mis à jour");
  }

  static async deleteArticle(req, res) {
    const id = req.body.id;
    await Article.deleteOne({ _id: id });
    res.status(200).send("Article supprimée");
  }
};
