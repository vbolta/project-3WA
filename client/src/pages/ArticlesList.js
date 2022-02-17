import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SearchBar from "../components/Searchbar";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/articles").then((response) => {
      setArticles(response.data);
    });
  }, []);

  return (
    <>
      <SearchBar articles={articles} />
    </>
  );
};

export default ArticlesList;
