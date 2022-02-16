import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Axios from "axios";
import Form from "../components/Form";
import { useState } from "react";

const UpdateReview = () => {
  const [newArticleData, setNewArticleData] = useState({
    id: "",
    title: "location.state.title",
    picture: "",
    content: "location.state.content",
  });

  const handleSubmit = () => {
    const data = new FormData();
    data.append("id", "id");
    data.append("title", newArticleData.title);
    data.append("file", newArticleData.picture);
    data.append("content", newArticleData.content);

    Axios.post(
      "http://localhost:3001/articles/6207f4ff39324f5b132b6656/update",
      data
    )
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert("ERROR");
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Modifier votre article</h1>
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
            value={newArticleData.title}
            onChange={(e) =>
              setNewArticleData({ ...newArticleData, title: e.target.value })
            }
          />
        </InputGroup>

        <InputGroup>
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

        <InputGroup>
          <InputGroup.Text>Contenu de l'article</InputGroup.Text>
          <FormControl
            as="textarea"
            aria-label="Contenu de l'article"
            type="text"
            name="content"
            value={newArticleData.content}
            onChange={(e) =>
              setNewArticleData({ ...newArticleData, content: e.target.value })
            }
          />
        </InputGroup>
        <button className="btn btn-succes">Modifier l'article</button>
      </Form>
    </>
  );
};

export default UpdateReview;
