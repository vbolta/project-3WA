export const SearchBar = ({ articles }) => {
  return (
    <form action="/" method="get">
      <input
        type="text"
        id="header-search"
        placeholder="Chercher un article"
        name="search"
      />
      {articles.map((article) => {
        //  return article.map(data) => {
        //       return <div>{console.log(data)}</div>
        //   })
        return article.map((data) => {
          return <li>{data.title}</li>;
        });
      })}
      <button type="submit">{console.log(articles)}</button>
    </form>
  );
};

export default SearchBar;
