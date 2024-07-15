import { Footer } from "./modules/Footer/Footer";
import { Header } from "./modules/Header/Header";
import { Goods } from "./modules/Goods/Goods";
import { Subscribe } from "./modules/Subscribes/Subscribe";
import { Hero } from "./modules/Hero/Hero";
import { Order } from "./modules/Order/Order";
import { Filter } from "./modules/Filter/Filter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { registerCart } from "./redux/cartSlice";

export const App = () => {
  const dispatch  = useDispatch();

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      // await dispatch(registerCart());
    }

    initializeCart();

  }, [dispatch]);

  return (
    <>
      <Header />
      
      <main>
      <Hero />
      <Filter />
      <Goods />
      <Subscribe />
      </main>

      <Footer />
      <Order />
    </>
  )
};
