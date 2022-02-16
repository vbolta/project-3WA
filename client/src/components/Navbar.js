import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/bird.png";
import toast from "react-hot-toast";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";

export const Navbar = ({ props }) => {
  // console.log(isAuthenticated);
  // const test = handleLogout();

  console.log(props);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const user = props.user;

  const cart = localStorage.getItem("cart");

  const [product, setProduct] = useState({
    name: "test",
    price: 23,
  });

  useEffect(() => {
    if (!user) return;
    setAuthenticated(true);
  }, [user, setAuthenticated]);

  const handleLogout = () => {
    props.logout();
    setAuthenticated(false);
    // console.log("test");
  };

  const makePayment = (token) => {
    const body = { token, product };
    Axios.post("http://localhost:3001/orders/payment", body)
      .then((response) => {
        console.log(response);
        // const { status } = response;
        // console.log(status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TropiPhoto
          <img className="logo" src={logo} alt="Logo de l'application" />
        </Link>
        {/* <a href="https://www.flaticon.com/free-icons/macaw" title="macaw icons">
          Macaw icons created by Smashicons - Flaticon
        </a> */}
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
        <button onClick={makePayment}>TEST</button>

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/new/article">
                    Créer un article
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/account/register">
                    Inscription
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success" to="/account/login">
                    CONNEXION
                  </Link>
                </li>
              </>
            )}

            <>
              <header>Go to cart ({cart && cart.split(",").length})</header>
              {cart && (
                <StripeCheckout
                  stripeKey={
                    "pk_test_51KQGxlF8ilF9NswhOpwMDzSMvPRvzpgLaa8JE06tHjFgafXUvu2TG5yoDPYrB3S1FfG5BgCfHaPMusav7dC1kDeG00TqkvBd2O"
                  }
                  token={makePayment}
                  name="Test"
                >
                  <button>Test</button>
                </StripeCheckout>
              )}
            </>

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <button
                    className="logout-button"
                    onClick={() => {
                      handleLogout();
                      toast.success("Déconnexion réussie");
                    }}
                  >
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
