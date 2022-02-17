import React, { useEffect, useState } from "react";
import Axios from "axios";
import SearchBar from "../components/Searchbar";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_SERVER_URL + "/articles").then(
      (response) => {
        setArticles(response.data);
      }
    );
  }, []);

  return (
    <>
      <SearchBar articles={articles} />
    </>
  );
};

export default ArticlesList;
