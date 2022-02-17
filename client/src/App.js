/**----------Pages------------------*/
import HomePage from "./pages/Homepage";
import ArticlesList from "./pages/ArticlesList";
import Article from "./pages/Article";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateArticle from "./pages/CreateArticle";
import UpdateArticle from "./pages/UpdateArticle";
/**----------Libraries------------------*/
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { getCurrentUser } from "./services/Authentification";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart" || "[]"));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [cart, setCart] = useState(cartFromLocalStorage);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setAuthenticated(false);
    if (cart === null) {
      setCart([]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [isAuthenticated, cart]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(false);
  };

  const deleteCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <BrowserRouter>
      <Toaster />
      <Navbar
        props={{
          user: user,
          logout: logout,
          isAuthenticated: isAuthenticated,
          cart: cart,
          deleteCart: deleteCart,
        }}
      />
      <div className="container-md">
        <Routes>
          <Route
            path="/account/login"
            element={<LoginPage setAuthenticated={setAuthenticated} />}
          />
          <Route path="/account/register" element={<RegisterPage />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/new/article" element={<CreateArticle />} />
          <Route
            path="/article/:id"
            element={<Article cart={cart} setCart={setCart} user={user} />}
          />
          <Route path="/article/update/:id" element={<UpdateArticle />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<HomePage user={user} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
