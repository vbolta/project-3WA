const Review = require("../models/review.model");
const jwt = require("jsonwebtoken");

module.exports = class ReviewController {
  static getAllReviews(req, res) {
    Review.find().then(function (reviews) {
      res.status(200).send(reviews);
    });
  }

  static getReviewsByPost(req, res) {
    // console.log("test " + req.params.id);

    const product_id = req.params.id;
    Review.find({ product_id: product_id }).then(function (reviews) {
      res.status(200).send(reviews);
    });
    // const product_id = req.body.product_id;

    // Review.find().then(function (reviews) {
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
        }
      }
    );
  }

  static async updateReview(req, res) {
    const id = req.body.id;
    const newContent = req.body.content;

    await Article.findByIdAndUpdate(id, {
      content: newContent,
    });
    res.status(200).send("Commentaire modifié");
  }

  static async deleteReview(req, res) {
    const id = req.body.id;
    await Review.deleteOne({ _id: id });
    res.status(200).send("Commentaire supprimé");
  }
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
