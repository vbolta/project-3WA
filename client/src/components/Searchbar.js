import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

export const SearchBar = ({ articles }) => {
  console.log(articles);
  const [searchTerm, setSearchTerm] = useState();
  return (
    <>
      <form action="/" method="get" className="searchbar">
        <input
          type="text"
          id="header-search"
          placeholder="Chercher un article"
          name="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>
      <div className="articles-list">
        {articles.length > 0 &&
          articles
            .filter((value) => {
              const articleSearch = value.title.toLowerCase();
              if (searchTerm === "" || searchTerm === undefined) {
                return value;
              } else if (
                searchTerm &&
                articleSearch.includes(searchTerm.toLowerCase())
              ) {
                return value;
              }
            })
            .map((article) => {
              return (
                <div key={article._id}>
                  <Card className="article-card">
                    <Card.Img variant="top" src={article.picture} />
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>
                      <Link to={"/article/" + article._id}>
                        <Button className="custom-btn">
                          Visiter l'article
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default SearchBar;
