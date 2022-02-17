import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/bird.png";
import toast from "react-hot-toast";
import StripeCheckout from "react-stripe-checkout";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Navbar = ({ props }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);

  const user = props.user;
  const cart = props.cart;

  useEffect(() => {
    if (!user) return;
    setAuthenticated(true);
    setProducts(cart);
  }, [user, setAuthenticated, cart]);

  const handleLogout = () => {
    props.logout();
    setAuthenticated(false);
  };

  const makePayment = (token) => {
    const body = { products, token };
    Axios.post(process.env.REACT_APP_SERVER_URL + "/orders/payment", body)
      .then((response) => {
        console.log(response);
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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/articles">
                    Liste des articles
                  </Link>
                </li>
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
              {cart && (
                <>
                  <StripeCheckout
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                    token={makePayment}
                    name="Confirmer votre commande"
                  >
                    <li className="nav-item">
                      <button className="btn btn-success">
                        <AiOutlineShoppingCart /> ({cart && cart.length})
                        PAIEMENT
                      </button>
                    </li>
                  </StripeCheckout>

                  {cart.length > 0 && (
                    <li className="nav-item">
                      <button
                        className="btn btn-warning"
                        onClick={props.deleteCart}
                      >
                        VIDER LE PANIER
                      </button>
                    </li>
                  )}
                </>
              )}
            </>

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
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
