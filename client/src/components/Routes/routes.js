// import React from "react";
// import { createBrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "../header/header";
// import MainHeader from "../header/mainHeader";
// import Cart from "../Pages/cart";
// import Home from "../Pages/home";
// import Product from "../Pages/Product";
// import ProductDetail from "../Pages/productDetail";
// import Signup from "../Pages/signup";
// const Root = () => {
//   <Routes>
//     <Route path="/" element={<MainHeader />}>
//       <Route index element={<Home />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/products" Component={<Product />} />
//       <Route path="/productDetail" Component={<ProductDetail />} />
//       <Route path="/" exact Component={<Cart />} />
//     </Route>
//   </Routes>;
// };
// const Root = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <Header />
//       </>
//     ),
//     children: [
//       // { index, element: <Home /> },
//       { path: "/signup", element: <Signup /> },
//       { path: "/login", element: <Product /> },
//     ],
//   },
// ]);
// export default Root;
