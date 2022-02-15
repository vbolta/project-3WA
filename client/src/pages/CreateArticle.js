import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "../components/Form";
import { useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/esm/Button";

const CreateArticle = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    picture: "",
    content: "",
    createdAt: "",
  });

  const date = new Date();

  const handleSubmit = () => {
    const data = new FormData();
    data.append("title", articleData.title);
    data.append("file", articleData.picture);
    data.append("content", articleData.content);
    data.append("createdAt", date.toISOString());

    Axios.post("http://localhost:3001/articles/createArticle", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
      .then((response) => {
        // console.log(response);
        if (response.data.error) {
          alert("ERROR");
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Créer votre article</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            Titre de l'article
          </InputGroup.Text>
          <FormControl
            type="text"
            name="title"
            placeholder="Titre"
            aria-label="title"
            aria-describedby="basic-addon1"
            onChange={(e) =>
              setArticleData({ ...articleData, title: e.target.value })
            }
          />
        </InputGroup>

        <InputGroup>
          <FormControl
            aria-label="Contenu de l'article"
            type="file"
            name="picture"
            onChange={(e) =>
              setArticleData({
                ...articleData,
                picture: e.target.files[0],
              })
            }
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Text>Contenu de l'article</InputGroup.Text>
          <FormControl
            as="textarea"
            aria-label="Contenu de l'article"
            type="text"
            name="content"
            onChange={(e) =>
              setArticleData({ ...articleData, content: e.target.value })
            }
          />
        </InputGroup>
        <button className="btn btn-succes">Créer un nouvel article</button>
      </Form>
    </>
  );
};

export default CreateArticle;
