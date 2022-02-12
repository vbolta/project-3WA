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

  static async deleteArticle(req, res) {
    const id = req.body.id;
    await Article.deleteOne({ _id: id });
    res.send("Delete");
  }
};

// module.exports = {
//   getAllArticles: (req, res) => {
//     Article.find().then(function (articles) {
//       res.send(articles);
//     });
//   },

//   getOneArticle: (req, res) => {
//     // console.log(req);
//     const id = req.params.id;
//     Article.findById(id).then(function (article) {
//       res.send(article);
//     });
//   },

//   addOneArticle: (req, res) => {
//     const { id, name } = jwt.verify(req.headers.accesstoken, "secret");
//     const title = req.body.title;
//     const content = req.body.content;
//     const author = {
//       id: id,
//       name: name,
//     };

//     const url = req.protocol + "://" + req.get("host");
//     Article.create(
//       {
//         title: title,
//         picture: url + "/images/" + req.file.filename,
//         author: author,
//         content: content,
//       },
//       function (err, result) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(result);
//           res.send("Article ajoutée");
//         }
//       }
//     );
//   },
// };
