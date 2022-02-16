import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ReviewForm from "../components/ReviewForm";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";

const Article = ({ cart, setCart, user }) => {
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState([]);
  const id = useMatch("article/:id").params.id;

  console.log(user);
  console.log(articleData);

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
    // console.log(cart);
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
    Axios.post(`http://localhost:3001/articles/${id}/delete`, {
      id: id,
    }).then((response) => {
      console.log(response);
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      navigate("/");
    });
  };

  return (
    <>
      <div className="article-display">
        <section>
          <h1>{articleData.title}</h1>
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
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item
              href="#/action-1"
              name="test"
              onClick={() => {
                addToCart(articleData.title);
                toast.success("Article ajouté dans votre panier");
              }}
            >
              Action
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </section>

        {/* <Button variant="primary" onClick={addToCart}>
      Checkout
    </Button> */}

        {articleData.author && user.id === articleData.author.id && (
          <div className="article-user-btn">
            <Popup
              trigger={
                <Button variant="danger">Supprimer l'article</Button>
                // <button className="button"> Supprimer l'article </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="custom-modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header">
                    Êtes-vous certain de vouloir supprimer cet article?
                  </div>
                  <div className="actions">
                    <Button
                      variant="warning"
                      onClick={() => {
                        handleDelete();
                        toast.success("Article supprimée");
                      }}
                    >
                      OUI
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
            <Button variant="warning">
              <Link
                className="nav-link"
                to={"/article/update/" + id}
                state={articleData}
              >
                Modifier l'article
              </Link>
            </Button>
          </div>
        )}
      </div>
      <ReviewForm productId={id} />
    </>
  );
};

export default Article;
