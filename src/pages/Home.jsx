import { Hero } from "../modules/Hero/Hero";
import { Filter } from "../modules/Filter/Filter";
import { Goods } from "../modules/Goods/Goods";
import { Subscribe } from "../modules/Subscribes/Subscribe";

const Home = ({ setTitleGoods, titleGoods }) => {
  return (
    <>
      <Hero />
      <Filter setTitleGoods={setTitleGoods} />
      <Goods title={titleGoods} />
      <Subscribe />
    </>
  );
};

export default Home;
