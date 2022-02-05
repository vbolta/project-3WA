import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

export const Navbar = () => {
  // console.log(isAuthenticated);
  // const test = handleLogout();

  // console.log(test);
  const [isAuthenticated, setAuthenticated] = useState(false);

  // console.log(localStorage.getItem("token"));

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthenticated(true);
    }
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  console.log(isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthenticated(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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

            {isAuthenticated && (
              <>
                {" "}
                <li className="nav-item">
                  <button className="btn btn-warning" onClick={handleLogout}>
                    Déconnexion
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
