import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import CreateArticle from "./pages/CreateArticle";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import Article from "./pages/Article";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "./services/Authentification";

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
      console.log(currentUser);
    }
  }, [user]);

  console.log(user);

  // useEffect(() => {
  //   if (!user) {
  //     const currentUser = getCurrentUser();
  //     setUser(currentUser);
  //     console.log(user);
  //   }
  // }, []);

  const [cart, setCart] = useState([]);

  localStorage.setItem("cart", cart);

  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     const token = localStorage.getItem("accessToken");
  //     const decoded = jwt_decode(token);
  //     console.log(decoded);

  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Navbar />
      {/* {user && <Navbar />} */}
      <div className="container mt-3">
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
            element={<Article cart={cart} setCart={setCart} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;