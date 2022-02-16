import Axios from "axios";
import Form from "../components/Form";
import Field from "../components/Field";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/Authentification";
import Button from "react-bootstrap/esm/Button";
import toast from "react-hot-toast";

const ReviewForm = ({ productId }) => {
  const [reviewData, setReviewData] = useState([]);
  const [review, setReview] = useState({ author: "", content: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const user = getCurrentUser();
  const handleChange = (name, value) => {
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = () => {
    Axios.post("http://localhost:3001/reviews/create", {
      author: user,
      content: review.content,
      product_id: productId,
    });
    setIsSubmitted(true);
  };

  const handleDelete = (review_id) => {
    Axios.post(`http://localhost:3001/reviews/delete`, {
      id: review_id,
    }).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
    });
    setIsDeleted(true);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/reviews/find/" + productId + "/").then(
      (response) => {
        setReviewData(response.data);
      }
    );
    setIsSubmitted(false);
    setIsDeleted(false);
  }, [productId, isSubmitted, isDeleted]);

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
      <ul>
        {reviewData.length > 0 &&
          reviewData.map((review) => {
            return (
              <>
                <li>{review.content}</li>
                <li>{review.author.name}</li>
                <li>{review.createdAt}</li>

                <Button
                  variant="secondary"
                  onClick={() => handleDelete(review._id)}
                >
                  Supprimer le commentaire
                </Button>
                <Button variant="secondary">Modifier le commentaire</Button>
              </>
            );
          })}
      </ul>
    </>
  );
};

export default ReviewForm;
