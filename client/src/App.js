import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import CreateArticle from "./pages/CreateArticle";
import UpdateArticle from "./pages/UpdateArticle";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import Article from "./pages/Article";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "./services/Authentification";
import toast, { Toaster } from "react-hot-toast";

import Footer from "./components/Footer";
import ArticlesList from "./components/ArticlesList";

function App() {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setAuthenticated] = useState(false);

  const getCurrentUser = () => {
    try {
      const token = localStorage.getItem("accessToken");
      return { ...jwt_decode(token), token };
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setAuthenticated(false);
  }, [isAuthenticated]);

  const [cart, setCart] = useState([]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(false);
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
        }}
      />
      {/* {user && <Navbar />} */}
      <div className="container-fluid fill">
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
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
