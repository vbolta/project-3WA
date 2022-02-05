import { useEffect, useState } from "react";
import Axios from "axios";
import { useMatch } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";

const Article = () => {
  const [articleData, setArticleData] = useState([]);

  const id = useMatch("article/:id").params.id;

  useEffect(() => {
    Axios.get("http://localhost:3001/articles/" + id).then((article) => {
      console.log(article);
      setArticleData(article.data);
    });
  }, []);

  return (
    <>
      <h1>{articleData.title}</h1>
      <section>
        <h2>Contenu de l'article</h2>
        <p>{articleData.content}</p>
        <h2>Auteur</h2>
        <p>{articleData.author.name}</p>
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
    </>
  );
};

export default Article;
