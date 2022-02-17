import { useState } from "react";
import { useMatch, useLocation, Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";
import toast from "react-hot-toast";
import Form from "../components/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const UpdateArticle = () => {
  const id = useMatch("article/update/:id").params.id;
  const navigate = useNavigate();
  const location = useLocation();

  const [newArticleData, setNewArticleData] = useState({
    id: "",
    title: location.state.title,
    picture: "",
    content: location.state.content,
  });

  const handleSubmit = () => {
    const data = new FormData();
    data.append("id", id);
    data.append("title", newArticleData.title);
    data.append("file", newArticleData.picture);
    data.append("content", newArticleData.content);

    Axios.post(
      process.env.REACT_APP_SERVER_URL + "/articles/" + id + "/update",
      data
    )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
      })
      .catch((err) => console.log(err));
    navigate("/article/" + id);
  };

  return (
    <>
      <h1>Modifier votre article</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text id="basic-addon1">
            Titre de l'article
          </InputGroup.Text>
          <FormControl
            type="text"
            name="title"
            placeholder="Titre"
            aria-label="title"
            aria-describedby="basic-addon1"
            value={newArticleData.title}
            onChange={(e) =>
              setNewArticleData({ ...newArticleData, title: e.target.value })
            }
          />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <FormControl
            aria-label="Contenu de l'article"
            type="file"
            name="picture"
            onChange={(e) =>
              setNewArticleData({
                ...newArticleData,
                picture: e.target.files[0],
              })
            }
          />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text>Contenu de l'article</InputGroup.Text>
          <FormControl
            as="textarea"
            aria-label="Contenu de l'article"
            type="text"
            name="content"
            rows={6}
            value={newArticleData.content}
            onChange={(e) =>
              setNewArticleData({ ...newArticleData, content: e.target.value })
            }
          />
        </InputGroup>
        <button className="btn btn-success">Modifier l'article</button>
      </Form>
    </>
  );
};

export default UpdateArticle;
