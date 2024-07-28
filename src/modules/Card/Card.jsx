import classNames from 'classnames';
import style from "./Card.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addItemToCart } from '../../redux/thunks/addItemToCart';
import { toggleCart } from '../../redux/slices/cartSlice';


export const Card = ({ className, id, img, title, price }) => {
  const dispatch  = useDispatch();
  const isOpenCart = useSelector((state) => state.cart.isOpen);

  const [buttonText, setButtonText] = useState(`${price}\u00A0BYN`); 

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
    setButtonText(`${price}\u00A0BYN`);
  }

  const calcDeliveryTime = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
  
    let deliveryDate;
  
    if (currentHour < 7) {
      deliveryDate = `сегодня после 9:00`;
    } else if (currentHour < 19) { 
      const deliveryTime = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
      const deliveryHour = deliveryTime.getHours();
      
      if (deliveryHour < 21) {
        deliveryDate = `сегодня после ${deliveryHour}:00`;
      } else {
        deliveryDate = `завтра с 9:00`;
      }
    } else { // Если текущее время больше 19:00
      deliveryDate = `завтра с 9:00`;
    }
  
    return deliveryDate;
  };

  useEffect(() => {
    const deliveryTime = calcDeliveryTime();
    setDateDelivery(deliveryTime);
  }, []);

  return (

    <article className={classNames(className, style.card, "card")}>
      <img
        className={style.image} src={img} alt={title} />
      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
        <div className={style.footer}>
          <p className={style['date-delivery']}>{dateDelivery}</p>
          <button className={style.button} 
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
