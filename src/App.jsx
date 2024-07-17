import { Footer } from "./modules/Footer/Footer";
import { Header } from "./modules/Header/Header";
import { Goods } from "./modules/Goods/Goods";
import { Subscribe } from "./modules/Subscribes/Subscribe";
import { Hero } from "./modules/Hero/Hero";
import { Order } from "./modules/Order/Order";
import { Filter } from "./modules/Filter/Filter";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchCart, registerCart } from "./redux/cartSlice";

export const App = () => {
  const dispatch  = useDispatch();
  const [titleGoods, setTitleGoods] = useState("");
  const goodsRef = useRef(null); // добавили для управлением скролла

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };

    initializeCart();
  }, [dispatch]);

  return (
    <>
      <Header setTitleGoods={setTitleGoods} goodsRef={goodsRef} />
      
      <main>
      <Hero />
      <Filter setTitleGoods={setTitleGoods} />
      <Goods title={titleGoods} ref={goodsRef} />
      <Subscribe />
      </main>

      <Footer />
      <Order />
    </>
  )
};
