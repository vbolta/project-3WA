import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Axios from "axios";
import Form from "../components/Form";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import { getCurrentUser } from "../services/Authentification";

const UpdateReview = ({ props }) => {
  const [newReviewContent, setNewReviewContent] = useState({
    id: "",
    content: props.review.content,
  });

  const handleSubmit = () => {
    Axios.post(
      "http://localhost:3001/reviews/" + props.review._id + "/update",
      {
        id: props.review._id,
        content: newReviewContent.content,
      }
    )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
      })
      .catch((err) => console.log(err));
    props.setIsUpdated(true);
  };

  console.log(getCurrentUser());

  return (
    <>
      <Popup
        trigger={<Button variant="secondary">Modifier le commentaire</Button>}
        modal
        nested
      >
        {(close) => (
          <div className="custom-modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header">Modifier le commentaire</div>

            <InputGroup>
              <InputGroup.Text>Contenu de l'article</InputGroup.Text>
              <FormControl
                aria-label="Contenu de l'article"
                type="text"
                name="content"
                value={newReviewContent.content}
                onChange={(e) =>
                  setNewReviewContent({
                    ...newReviewContent,
                    content: e.target.value,
                  })
                }
              />
            </InputGroup>

            <div className="actions">
              <Button
                variant="success"
                onClick={() => {
                  handleSubmit();
                  toast.success("Commentaire modifié");
                }}
              >
                Modifier le commentaire
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  close();
                }}
              >
                ANNULER
              </Button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default UpdateReview;
