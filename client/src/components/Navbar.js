import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  // console.log(isAuthenticated);
  // const test = handleLogout();

  const [isAuthenticated, setAuthenticated] = useState(false);

  // // console.log(localStorage.getItem("token"));

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = () => {
    // setAuthenticated(localStorage.getItem("accessToken"));
    // if (isAuthenticated === false) {
    setAuthenticated(true);
    // }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthenticated(false);
    // console.log("test");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Hello-Code
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && (
              <>
                {" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/new/article">
                    Créer un article
                  </Link>
                </li>{" "}
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {!isAuthenticated && (
              <>
                {" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/account/register">
                    Inscription
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success" to="/account/login">
                    CONNEXION
                  </Link>
                </li>{" "}
              </>
            )}

            <>
              <header>
                Go to cart (
                {localStorage.getItem("cart") &&
                  localStorage.getItem("cart").split(",").length}
                )
              </header>
            </>

            {isAuthenticated && (
              <>
                {" "}
                <li className="nav-item">
                  <button className="logout-button" onClick={handleLogout}>
                    DECONNEXION
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
