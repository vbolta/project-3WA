import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ReviewForm from "../components/ReviewForm";

const Article = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState([]);
  const id = useMatch("article/:id").params.id;

  useEffect(() => {
    Axios.get("http://localhost:3001/articles/" + id).then((article) => {
      setArticleData(article.data);
    });

    // Axios.get("http://localhost:3001/reviews/find/" + id).then(
    //   console.log("here2")
    // );
  }, [id]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log(cart);
  };

  const handleClick = () => {
    Axios.post("http://localhost:3001/articles/checkout", {
      headers: {
        "Content-Type": "application/json",
        id: id,
        // mail: "data.email",
        // password: "data.password",
      },
    })
      .then((res) => {
        if (res.ok) return res.json;
        return res.son().then((json) => Promise.reject(json));
      })
      .then(({ url }) => console.log(url));
  };

  const handleDelete = () => {
    console.log(id);
    Axios.post(`http://localhost:3001/articles/${id}/delete`, {
      id: id,
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      navigate("/");
    });
  };

  return (
    <>
      <h1>{articleData.title}</h1>
      <section>
        <h2>Contenu de l'article</h2>
        <p>{articleData.content}</p>
        <h2>Auteur</h2>
        {articleData.author && <p>{articleData.author.name}</p>}
        <p>Category</p>
        {articleData.picture && (
          <Image
            src={articleData.picture}
            alt={articleData.title}
            thumbnail={true}
          />
        )}
        <p>{articleData.dateCreated}</p>
      </section>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item
          href="#/action-1"
          name="test"
          onClick={() => addToCart(articleData.title)}
        >
          Action
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      {/* <Button variant="primary" onClick={addToCart}>
        Checkout
      </Button> */}
      {console.log("test")}
      {articleData.author && (
        <>
          <Button variant="warning" onClick={handleDelete}>
            Supprimer l'article
          </Button>
          <Button variant="warning">
            {" "}
            <Link
              className="nav-link"
              to={"/article/update/" + id}
              state={articleData}
            >
              {" "}
              Modifier l'article
            </Link>
          </Button>
        </>
      )}
      <ReviewForm productId={id} />
    </>
  );
};

export default Article;
