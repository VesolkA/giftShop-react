import { CartItem } from '../CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import style from './Cart.module.scss';
import { useEffect, useRef, useState } from 'react';
import { toggleCart } from '../../redux/slices/cartSlice';
import { openModal } from '../../redux/slices/orderSlice';
import { Preload } from "../Preload/Preload";
import classNames from 'classnames';

export const Cart = () => {
  const dispatch = useDispatch();  
  const isOpen = useSelector((state) => state.cart.isOpen);
  const goodsInCart = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  

  const cartRef = useRef(null);

  const [dateDelivery, setDateDelivery] = useState('');

  const handlerCartClose = () => {
    dispatch(toggleCart());
  };

  const handlerOrderOpen = () => {
    dispatch(openModal());
  };

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

  useEffect(() => {
    if (isOpen) {
      cartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <section className={classNames('cart', style.open)} ref={cartRef}>
      <div className={style.container}>
        <div className={style.header}>
          <h3 className={style.title}>Ваш заказ</h3>

          <button className={style.close} onClick={handlerCartClose}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5.70715" width="1" height="25"
                transform="rotate(-45 5 5.70715)" fill="#D17D2F" />
              <rect x="22.6777" y="5" width="1" height="25"
                transform="rotate(45 22.6777 5)" fill="#D17D2F" />
            </svg>
          </button>
        </div>

        <p className={style['date-delivery']}>{dateDelivery}</p>

        {status === "loading" ? (
          <div className={style.preload}>
            <Preload />
          </div>
        ) : (
          <ul className={style.list}>
            {goodsInCart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </ul>
        )}

        <div className={style.footer}>
          <button className={style['order-btn']}
            onClick={handlerOrderOpen} 
            disabled={!goodsInCart.length}>Оформить</button>
          <p className={classNames(style.price, style['price_total'])}>
            {goodsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0)}&nbsp;BYN</p>
            
        </div>
      </div>
    </section>
  );
};