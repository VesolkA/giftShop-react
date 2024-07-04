import { Footer } from "./modules/Footer/Footer";
import { Header } from "./modules/Header/Header";
import { Goods } from "./modules/Goods/Goods";
import { Subscribe } from "./modules/Subscribes/Subscribe";
import { Hero } from "./modules/Hero/Hero";
import { Order } from "./modules/Order/Order";
import { OrderReady } from "./modules/Order/OrderReady";
import { Filter } from "./modules/Filter/Filter";

export const App = () => {

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
      <OrderReady />
    </>
  )
};
