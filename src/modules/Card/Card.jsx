import classNames from 'classnames';
import "./card.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addItemToCart } from '../../redux/thunks/addItemToCart';
import { toggleCart } from '../../redux/slices/cartSlice';


export const Card = ({ className, id, img, title, price }) => {
  const dispatch  = useDispatch();
  const isOpenCart = useSelector((state) => state.cart.isOpen);

  const [buttonText, setButtonText] = useState(`${price}\u00A0₽`); 

  const [dateDelivery, setDateDelivery] = useState('');

  const handlerAddToCart = () => {
    dispatch(addItemToCart({ productId: id }));

    if (!isOpenCart) {
      dispatch(toggleCart());
    }
  };

  const handleMouseEnter = () => {
    setButtonText('в корзину');
  }
  const handleMouseLeave = () => {
    setButtonText(`${price}\u00A0₽`);
  }

  const calcDeliveryTime = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let deliveryDate;
    if (currentHour < 21) {
      if (currentHour >= 9 && currentHour + 3 < 21) {
        const deliveryTime = new Date(currentDate.getTime() + 3 * 60 * 60 * 1000);
        deliveryDate = `сегодня после ${deliveryTime.getHours()}:00`;
      } else {
        deliveryDate = `сегодня после 21:00`;
      }
    } else {
      deliveryDate = `завтра с 9:00`;
    }
    return `${deliveryDate}`;
  };

  useEffect(() => {
    const deliveryTime = calcDeliveryTime();
    setDateDelivery(deliveryTime);
  }, []);

  return (

    <article className={classNames(className, "card")}>
      <img
        className="card__image" src={img} alt={title} />
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>
          <button className="card__button" 
          onClick={handlerAddToCart} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
          {buttonText}
          </button>
        </div>
      </div>
    </article>
  )
};
