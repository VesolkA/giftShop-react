// page Home 
import { Hero } from "../modules/Hero/Hero";
import { Filter } from "../modules/Filter/Filter";
import { Goods } from "../modules/Goods/Goods";
import { Subscribe } from "../modules/Subscribes/Subscribe";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "../redux/thunks/fetchGoods";
import { useEffect } from "react";

export const Home = ({ setTitleGoods, titleGoods }) => {
  const dispatch = useDispatch();
  const goodsStatus = useSelector((state) => state.goods.status);
  const goods = useSelector((state) => state.goods.items);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      dispatch(fetchGoods());
    }
  }, [goodsStatus, dispatch]);

  useEffect(() => {
    console.log('Goods fetched:', goods);
  }, [goods]);

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


// const Home = ({ setTitleGoods, titleGoods }) => {
//   return (
//     <>
//       <Hero />
//       <Filter setTitleGoods={setTitleGoods} />
//       <Goods title={titleGoods} />
//       <Subscribe />
//     </>
//   );
// };

// export default Home;
