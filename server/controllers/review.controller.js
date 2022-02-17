const Review = require("../models/review.model");

module.exports = class ReviewController {
  static getAllReviews(req, res) {
    Review.find().then(function (reviews) {
      res.status(200).send(reviews);
    });
  }

  static getReviewsByPost(req, res) {
    const product_id = req.params.id;
    Review.find({ product_id: product_id }).then(function (reviews) {
      res.status(200).send(reviews);
    });
  }

  static async addReview(req, res) {
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
          res.status(200).send("Commentaire ajouté");
        }
      }
    );
  }

  static async updateReview(req, res) {
    const id = req.body.id;
    const newContent = req.body.content;

    await Review.findByIdAndUpdate(id, {
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
