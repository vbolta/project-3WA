import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ArticlesList from "../components/ArticlesList";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/articles/random").then((response) => {
      setArticles(response.data);
    });
  }, []);

  return (
    <>
      <div className="Article-cards">
        {articles.length > 0 &&
          articles.map((article) => (
            <div key={article._id}>
              <Card style={{ width: "18rem" }}>
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
