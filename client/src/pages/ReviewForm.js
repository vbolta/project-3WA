import Axios from "axios";
import Form from "../components/Form";
import Field from "../components/Field";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/Authentification";
import Button from "react-bootstrap/esm/Button";
import toast from "react-hot-toast";
import UpdateReview from "../pages/UpdateReview";

const ReviewForm = ({ productId }) => {
  const [reviewData, setReviewData] = useState([]);
  const [review, setReview] = useState({ author: "", content: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const user = getCurrentUser();
  const handleChange = (name, value) => {
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = () => {
    Axios.post(process.env.REACT_APP_SERVER_URL + "/reviews/create", {
      author: user,
      content: review.content,
      product_id: productId,
    });
    setIsSubmitted(true);
  };

  const handleDelete = (review_id) => {
    Axios.post(process.env.REACT_APP_SERVER_URL + "/reviews/delete", {
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
    Axios.get(
      process.env.REACT_APP_SERVER_URL + "/reviews/find/" + productId + "/"
    ).then((response) => {
      setReviewData(response.data);
    });
    setIsSubmitted(false);
    setIsDeleted(false);
    setIsUpdated(false);
  }, [productId, isSubmitted, isDeleted, isUpdated]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field
          class="review-input"
          type="text"
          name="content"
          id="review-content"
          placeholder="Commentaire d'un utilisateur"
          label="Ajouter un commentaire"
          value={review.content}
          onChange={handleChange}
        ></Field>
      </Form>
      {reviewData.length > 0 &&
        reviewData.map((review) => {
          return (
            <>
              <div className="reviews">
                <ul key={review._id}>
                  <li className="content">{review.content}</li>
                  <li className="author">
                    Ecrit par {review.author.name} le {review.createdAt}
                  </li>
                </ul>
                {review.author.id === user.id && (
                  <>
                    <div>
                      <Button
                        variant="secondary"
                        onClick={() => handleDelete(review._id)}
                      >
                        Supprimer le commentaire
                      </Button>
                      <UpdateReview
                        props={{ review: review, setIsUpdated: setIsUpdated }}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          );
        })}
      <div className="clear"></div>
    </>
  );
};

export default ReviewForm;
