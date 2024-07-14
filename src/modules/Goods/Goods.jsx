import './goods.scss';
// import { goodsArray } from "../../goodsArray";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { useEffect } from 'react';

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

   // start help
  if (goodsStatus === 'loading') {
    return <p>Загрузка товаров...</p>;
  }
  if (goodsStatus === 'failed') {
    return <p>Ошибка загрузки товаров: {error}</p>;
  }
  if (!goods || goods.length === 0) {
    return <p>Нет доступных товаров.</p>;
  }
  // end of help

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>

          <ul className="goods__list">
            {goods.map((item) => (
              <li key={item.id} className="goods__item">
                <Card className='goods__card' {...item} />
              </li>
            ))}

          </ul>
        </div>
        <Cart />
      </div>
    </section>

  );
};



