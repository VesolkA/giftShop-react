import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Footer } from "./modules/Footer/Footer";
import { Header } from "./modules/Header/Header";
// import { Goods } from "./modules/Goods/Goods";
// import { Subscribe } from "./modules/Subscribes/Subscribe";
// import { Hero } from "./modules/Hero/Hero";
import { Order } from "./modules/Order/Order";
// import { Filter } from "./modules/Filter/Filter";
import { useDispatch } from "react-redux";
import { registerCart } from "./redux/thunks/registerCart";
import { fetchCart } from "./redux/thunks/fetchCart";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";

export const App = () => {
  const dispatch = useDispatch();
  const [titleGoods, setTitleGoods] = useState("");

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };

    initializeCart();
  }, [dispatch]);


  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home setTitleGoods={setTitleGoods} titleGoods={titleGoods} />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
      <Order />
    </Router>
  );
};
