import './goods.scss';
// import { goodsArray } from "../../goodsArray";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { useEffect } from 'react';
import { API_URL } from '../../const';


export const Goods = () => {
  const dispatch = useDispatch();
  const {
    items: goods,
    status: goodsStatus,
    error,
  } = useSelector((state) => state.goods);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      dispatch(fetchGoods());
    }
  }, [dispatch, goodsStatus]);

  let content = null;

   // start help
  if (goodsStatus === 'loading') {
    content = <p>Загрузка товаров...</p>;
  }
  if (goodsStatus === "succeeded") {
    content = (
    <ul className="goods__list">
    {goods.map((item) => (
      <li key={item.id} className="goods__item">
        <Card className='goods__card' 
        id={item.id}
        img={`${API_URL}${item.photoUrl}`}
        title={item.name}
        dateDelivery="сегодня в 14.00"
        price={item.price}
        />
      </li>
    ))}
  </ul>
  );
  }

  if (goodsStatus === 'failed') {
    content = <p>Ошибка загрузки товаров: {error}</p>;
  }
  // if (!goods || goods.length === 0) {
  //   return <p>Нет доступных товаров.</p>;
  // }

  // end of help


  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>
          {content}
        </div>
        <Cart />
      </div>
    </section>

  );
};



