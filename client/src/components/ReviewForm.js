import Axios from "axios";
import Form from "../components/Form";
import Field from "../components/Field";
import { useState } from "react";

const ReviewForm = () => {
  const [review, setReview] = useState({ author: "test", content: "test" });

  const handleSubmit = () => {
    console.log("here");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field label="Ajouter un commenteraire"></Field>
      </Form>
    </>
  );
};

export default ReviewForm;
