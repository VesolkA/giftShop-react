// Goods.jsx 
import style from "./Goods.module.scss";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import { useSelector } from 'react-redux';
import { API_URL } from '../../const';
import { Preload } from '../Preload/Preload';
import classNames from "classnames";

export const Goods = ({ title }) => {
  const {
    items: goods,
    status: goodsStatus,
    error,
  } = useSelector((state) => state.goods);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <Preload />;
  }

  if (goodsStatus === "succeeded" && goods.length) {
    content = (
      <ul className={style.list}>
        {goods.map((item) => (
          <li key={item.id} className={style.item}>
            <Card className={style.card}
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

  if (goodsStatus === "succeeded" && !goods.length) {
    content = <p className={style.content}>По вашему запросу ничего не найдено!</p>
  }

  if (goodsStatus === 'failed') {
    content = <p className={style.content}>Ошибка загрузки товаров: {error}</p>;
  }

  return (
    <section className={style.goods} style={{ position: goodsStatus === "loading" ? "relative" : "" }}>
      <div className={classNames(style.container, "container")}>
        <div className={style.box}>
          <h2 className={style.title}>{title}</h2>
          {content}
        </div>
        <Cart />
      </div>
    </section>
  );
};
