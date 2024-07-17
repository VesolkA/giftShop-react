import './goods.scss';
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import { useSelector } from 'react-redux';
import { API_URL } from '../../const';
import { forwardRef } from 'react'; // импортируем useRef

export const GoodsRender = ({ title }, ref) => {
  const {
    items: goods,
    status: goodsStatus,
    error,
  } = useSelector((state) => state.goods);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <p>Загрузка товаров...</p>;
  }
  if (goodsStatus === "succeeded" && goods.length) {
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

  if (!goods.length) {
    content = <p className='goods__content'>По вашему запросу ничего не найдено!</p>
  }

  if (goodsStatus === 'failed') {
    content = <p className='goods__content'>Ошибка загрузки товаров: {error}</p>;
  }

  return (
    <section className="goods" ref={ref}> {/* прикрепляем реф к секции */}
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">{title}</h2>
          {content}
        </div>
        <Cart />
      </div>
    </section>
  );
};

// Оборачиваем функцию рендеринга в forwardRef
export const Goods = forwardRef(GoodsRender);


