import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "../components/Form";
import toast from "react-hot-toast";

const CreateArticle = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    picture: "",
    content: "",
    createdAt: "",
  });

  const navigate = useNavigate();

  const date = new Date();

  const handleSubmit = () => {
    const data = new FormData();
    data.append("title", articleData.title);
    data.append("file", articleData.picture);
    data.append("content", articleData.content);
    data.append("createdAt", date.toISOString());

    Axios.post(
      process.env.REACT_APP_SERVER_URL + "/articles/createArticle",
      data,
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    )
      .then((response) => {
        navigate("/articles");
        toast.success("Article créé");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Veuillez réessayer en remplissant tous les champs");
      });
  };

  return (
    <>
      <h1>Créer votre article</h1>
      <Form
        class="login-register-form"
        onSubmit={() => {
          handleSubmit();
        }}
      >
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
            onChange={(e) =>
              setArticleData({ ...articleData, title: e.target.value })
            }
          />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <FormControl
            aria-label="Contenu de l'article"
            type="file"
            name="picture"
            rows={6}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                picture: e.target.files[0],
              })
            }
          />
        </InputGroup>

        <InputGroup className="mb-3 mt-3 ">
          <InputGroup.Text>Contenu de l'article</InputGroup.Text>
          <FormControl
            as="textarea"
            aria-label="Contenu de l'article"
            type="text"
            name="content"
            rows={6}
            onChange={(e) =>
              setArticleData({ ...articleData, content: e.target.value })
            }
          />
        </InputGroup>
        <button className="btn btn-success">Créer un nouvel article</button>
      </Form>
    </>
  );
};

export default CreateArticle;
