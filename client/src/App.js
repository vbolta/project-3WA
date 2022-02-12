import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import CreateArticle from "./pages/CreateArticle";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import Article from "./pages/Article";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [cart, setCart] = useState([]);

  localStorage.setItem("cart", cart);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/account/login" element={<LoginPage />} />
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
