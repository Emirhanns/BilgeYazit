import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import BillPage from "./pages/BillPage";
import Customer from "./pages/Customer";
import Register from "./pages/register";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bills" element={<BillPage />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;