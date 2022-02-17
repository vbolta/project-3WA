import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";
import ReviewForm from "./ReviewForm";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";

const Article = ({ cart, setCart, user }) => {
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState([]);
  const id = useMatch("article/:id").params.id;

  useEffect(() => {
    Axios.get(process.env.REACT_APP_SERVER_URL + "/articles/" + id).then(
      (article) => {
        setArticleData(article.data);
      }
    );
  }, [id]);

  const addToCart = (name, price) => {
    setCart([...cart, { name: name, price: price }]);
  };

  const handleDelete = () => {
    Axios.post(`${process.env.REACT_APP_SERVER_URL}/articles/${id}/delete`, {
      id: id,
    }).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      navigate("/articles");
    });
  };

  return (
    <>
      <section className="article-flex">
        <div className="article-left">
          <h1>{articleData.title}</h1>
          <h2>Desription</h2>
          <p>{articleData.content}</p>
          <h2>Auteur</h2>
          {articleData.author && <p>{articleData.author.name}</p>}
        </div>
        <div className="article-right">
          {articleData.picture && (
            <Image
              className="article-img"
              src={articleData.picture}
              alt={articleData.title}
              responsive
            />
          )}
          <p>Date d'ajout de l'article: {articleData.dateCreated}</p>
          <p>Prix: {articleData.price} €</p>

          <button
            className="btn btn-success"
            name="Ajout au Panier"
            onClick={() => {
              addToCart(articleData.title, articleData.price);
              toast.success("Article ajouté dans votre panier");
            }}
          >
            Ajout au Panier
          </button>
          {articleData.author && user && user.id === articleData.author.id && (
            <>
              <Popup
                trigger={<Button variant="danger">Supprimer l'article</Button>}
                modal
                nested
              >
                {(close) => (
                  <div className="custom-modal delete-article">
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
                  className="article-update-btn"
                  to={"/article/update/" + id}
                  state={articleData}
                >
                  Modifier l'article
                </Link>
              </Button>
            </>
          )}
        </div>
      </section>

      {user && <ReviewForm productId={id} />}
    </>
  );
};

export default Article;
