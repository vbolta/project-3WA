const Review = require("../models/review.model");
const jwt = require("jsonwebtoken");

module.exports = class ReviewController {
  static getAllReviews(req, res) {
    Review.find().then(function (reviews) {
      res.status(200).send(reviews);
    });
  }

  static getOneArticle(req, res) {
    const id = req.params.id;
    Article.findById(id).then(function (article) {
      res.send(article);
    });
  }

  static getReviewsByPost(req, res) {
    console.log(req.params.id);

    // const id = req.params.id;
    // Review.findById(id).then(function (article) {
    //   res.send(article);
    // });
    // const product_id = req.body.product_id;

    // Review.find().then(function (reviews) {
    //   res.status(200).send(reviews);
    // });
  }

  static async addReview(req, res) {
    // const data = {
    //   product_id: id,
    //   // content: req.body.rating,
    // };

    const author = {
      id: req.body.author.id,
      name: req.body.author.name,
      mail: req.body.author.mail,
    };
    const content = req.body.content;
    const product_id = req.body.product_id;

    Review.create(
      {
        content: content,
        author: author,
        product_id: product_id,
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.status(200).send("Commentaire ajouté");
          // res.send("Commentaire ajoutée");
        }
      }
    );

    // const review = await Review.create(data);
    // res.status(200).send(review);
  }

  // static async userByReview(req, res) {
  //   console.log(req);
  //   const { id } = req.params;
  //   const userByReview = await Review.findById(id).populate("user");
  //   res.send(userByReview);
  // }

  //   static getActiveUser(req, res) {
  //     const id = req.params.id;
  //     Article.findById(id).then(function (user) {
  //       res.send(user);
  //     });
  //   }
};

// const db = require("../models");

// // model
// const Review = db.reviews;

// // functions

// //1. Add Review

// const addReview = async (req, res) => {
//   const id = req.params.id;

//   let data = {
//     product_id: id,
//     rating: req.body.rating,
//     description: req.body.description,
//   };

//   const review = await Review.create(data);
//   res.status(200).send(review);
// };

// // 2. Get All Reviews

// const getAllReviews = async (req, res) => {
//   const reviews = await Review.findAll({});
//   res.status(200).send(reviews);
// };

// module.exports = {
//   addReview,
//   getAllReviews,
// };
