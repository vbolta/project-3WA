import Axios from "axios";
import Form from "../components/Form";
import Field from "../components/Field";
import { useState } from "react";
import { getCurrentUser } from "../services/Authentification";

const ReviewForm = () => {
  const [review, setReview] = useState({ author: "", content: "" });

  const user = getCurrentUser();

  const handleChange = (name, value) => {
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = () => {
    Axios.post("http://localhost:3001/reviews/create", {
      author: user,
      content: review.content,
    });
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
    </>
  );
};

export default ReviewForm;
