import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import BillPage from "./pages/BillPage";
import Cart from "./pages/Cart";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import StatsPage from "./pages/StatsPage";
function App() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteControl><Home /></RouteControl>} />
        <Route path="/cart" element={<RouteControl><Cart /></RouteControl>} />
        <Route path="/bills" element={<RouteControl><BillPage /></RouteControl>} />
        <Route path="/customer" element={<RouteControl><Customer /></RouteControl>} />
        <Route path="/stats" element={<RouteControl><StatsPage /></RouteControl>} />
        <Route path="/products" element={<RouteControl><ProductPage /></RouteControl>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};