import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const HomePage = ({ user }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_SERVER_URL + "/articles/random").then(
      (response) => {
        setArticles(response.data);
      }
    );
  }, []);

  return (
    <>
      <div className="homepage">
        {user ? (
          <h1>
            Bienvenue sur TropiPhoto{" "}
            <span className="username">{user.name}</span>
          </h1>
        ) : (
          <h1>Bienvenue sur TropiPhoto</h1>
        )}
      </div>

      <div className="Article-cards">
        {articles.length > 0 &&
          articles.map((article) => (
            <div key={article._id}>
              <Card className="article-card">
                <Card.Img variant="top" src={article.picture} />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Link to={"/article/" + article._id}>
                    <Button className="custom-btn">Visiter l'article</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};

export default HomePage;
