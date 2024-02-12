import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/home";
import MainHeader from "./components/header/mainHeader";
import Product from "./components/Pages/Product";
import Cart from "./components/Pages/cart";
import Login from "./components/Pages/login";
import Signup from "./components/Pages/signup";
import { useUserContext } from "./Store/context";
import { useEffect } from "react";
import NewProduct from "./components/Products/newProduct";
function App() {
  const { loginUser } = useUserContext();

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (token) {
  //         const response = await fetch(
  //           "http://localhost:8000/auth/check-token",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             credentials: "include",
  //             body: JSON.stringify({ token }),
  //           }
  //         );

  //         const data = await response.json();

  //         if (data.status) {
  //           console.log("Token validation successful", data.user);
  //           loginUser(data.user);
  //         } else {
  //           console.error("Token validation failed:", data.message);
  //           // Handle token validation failure (e.g., clear localStorage)
  //           localStorage.removeItem("token");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error during token validation:", error.message);
  //     }
  //   };

  //   checkToken();
  // }, [loginUser]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainHeader />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Product />} />
            <Route path="new" element={<NewProduct />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
