const Review = require("../models/review.model");

module.exports = class ReviewController {
  static getAllUsers(req, res) {
    User.find().then(function (users) {
      res.send(users);
    });
  }

  static async addReview(req, res) {
    // let data = {
    //   product_id: id,
    //   content: req.body.rating,
    // };

    const review = await Review.create(data);
    res.status(200).send(review);
  }

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
