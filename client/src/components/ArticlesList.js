import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/articles").then((response) => {
      setArticles(response.data);
    });
  }, []);

  return (
    <>
      {articles.length > 0 &&
        articles.map((article) => (
          <div key={article._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={article.picture} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Link to={"/article/" + article._id}>
                  <Button variant="primary">Visiter l'article</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
    </>
  );
};

export default ArticlesList;