import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchProduct } from "./api/product";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import AllOrder from "./pages/AllOrder";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const [isFakeAdmin, setIsFakeAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (admin === "true") {
        // If localStorage claims they're admin
        try {
          //  REAL check with backend (critical!)
          const res = await fetch(`${API_URL}/users/admin/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) {
            setIsFakeAdmin(true); //  Flag them as fake admin
            console.log("Caught a hacker!");
          }
        } catch (err) {
          setIsFakeAdmin(true);
        }
      }
    };
    verifyAdmin();
  }, [admin, token]);

  // 👇 Trolling fake admins
  useEffect(() => {
    if (isFakeAdmin) {
      Swal.fire({
        title: "NICE TRY, PAL!",
        text: "You thought changing localStorage would work?",
        icon: "error",
      });
      setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      }, 5000);
    }
  }, [isFakeAdmin]);

  const handleLogout = () => {
    Swal.fire({ title: "Logout Successfully", icon: "success" });
    setToken(null);
    setIsFakeAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const fetchData = async () => {
    const { data } = await fetchProduct();
    setProducts(data);
    setFilteredProduct(data);
  };

  useEffect(() => {
    let result = [...products];

    if (searchInput) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setFilteredProduct(result);
  }, [searchInput, products]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Router>
        <Navbar token={token} handleLogout={handleLogout} />
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={
              <Home
                token={token}
                products={filteredProduct}
                fetchData={fetchData}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
                userId={userId}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setToken={setToken}
                setUserId={setUserId}
                setAdmin={setAdmin}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              admin === "true" ? (
                isFakeAdmin ? (
                  <Navigate to="/" />
                ) : (
                  <Dashboard
                    products={products}
                    fetchData={fetchData}
                    token={token}
                    admin={admin}
                    userId={userId}
                  />
                )
              ) : (
                <Dashboard
                  products={products}
                  fetchData={fetchData}
                  token={token}
                  admin={admin}
                  userId={userId}
                />
              )
            }
          />
          <Route path="/cart" element={<Cart userId={userId} />} />
          <Route path="/myorder" element={<Order userId={userId} />} />
          <Route
            path="/allorder"
            element={
              admin === "true" ? (
                isFakeAdmin ? (
                  <Navigate to="/" />
                ) : (
                  <AllOrder userId={userId} />
                )
              ) : (
                <AllOrder userId={userId} />
              )
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail fetchData={fetchData} userId={userId} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
