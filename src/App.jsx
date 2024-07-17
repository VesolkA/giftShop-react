import { Footer } from "./modules/Footer/Footer";
import { Header } from "./modules/Header/Header";
import { Goods } from "./modules/Goods/Goods";
import { Subscribe } from "./modules/Subscribes/Subscribe";
import { Hero } from "./modules/Hero/Hero";
import { Order } from "./modules/Order/Order";
import { Filter } from "./modules/Filter/Filter";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { fetchCart, registerCart } from "./redux/cartSlice";

export const App = () => {
  const dispatch = useDispatch();
  const [titleGoods, setTitleGoods] = useState("");
  const filterRef = useRef(null);

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };

    initializeCart();
  }, [dispatch]);

  const scrollToFilter = () => {
    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
      <Header setTitleGoods={setTitleGoods} scrollToFilter={scrollToFilter} />

      <main>
        <Hero />
        <Filter setTitleGoods={setTitleGoods} filterRef={filterRef} />
        <Goods title={titleGoods} />
        <Subscribe />
      </main>

      <Footer />
      <Order />
    </>
  )
};
