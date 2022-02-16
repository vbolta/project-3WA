import Axios from "axios";
import Form from "../components/Form";
import Field from "../components/Field";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/Authentification";

const ReviewForm = ({ productId }) => {
  const [reviewData, setReviewData] = useState([]);
  const [review, setReview] = useState({ author: "", content: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const user = getCurrentUser();
  const handleChange = (name, value) => {
    setReview({ ...review, [name]: value });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/reviews/find/" + productId).then(
      (response) => {
        setReviewData(response.data);
      }
    );
    setIsSubmitted(false);
  }, [productId, setReviewData, isSubmitted]);
  // Axios.get("http://localhost:3001/reviews/find/" + id).then(

  // );

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/articles").then((response) => {
  //     setArticles(response.data);
  //   });
  // }, []);

  const handleSubmit = () => {
    // Axios.get("http://localhost:3001/reviews/find").then((response) => {
    //   // console.log(response);
    //   setReviewData(response.data);
    // });
    Axios.post("http://localhost:3001/reviews/create", {
      author: user,
      content: review.content,
      product_id: productId,
    });
    setIsSubmitted(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field
          type="text"
          name="content"
          id="text"
          placeholder="Commentaire d'un utilisateur"
          label="Ajouter un commentaire"
          value={review.content}
          onChange={handleChange}
        ></Field>
      </Form>
      <div>
        {reviewData.length > 0 &&
          reviewData.map((review) => <p>{review.content}</p>)}
      </div>
    </>
  );
};

export default ReviewForm;
