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

function App() {
  const [user, setUser] = useState(null);

  const getCurrentUser = () => {
    try {
      const token = localStorage.getItem("accessToken");
      return { ...jwt_decode(token), token };
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (!user) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      // console.log(currentUser);
    }
  }, [user]);

  const [cart, setCart] = useState([]);

  localStorage.setItem("cart", cart);

  return (
    <BrowserRouter>
      <Toaster />
      <Navbar user={user} />
      {/* {user && <Navbar />} */}
      <div className="container mt-3 test">
        <Routes>
          <Route
            path="/account/login"
            element={<LoginPage />}
            props={getCurrentUser}
          />
          <Route path="/account/register" element={<RegisterPage />} />
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
