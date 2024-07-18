import { CartItem } from '../CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import './cart.scss';
import { useEffect, useRef, useState } from 'react';
import { toggleCart } from '../../redux/slices/cartSlice';
import { openModal } from '../../redux/slices/orderSlice';
import { Preload } from "../Preload/Preload";

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

  useEffect(() => {
    if (isOpen) {
      cartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <section className="cart cart__open" ref={cartRef}>
      <div className="cart__container">
        <div className="cart__header">
          <h3 className="cart__title">Ваш заказ</h3>

          <button className="cart__close" onClick={handlerCartClose}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5.70715" width="1" height="25"
                transform="rotate(-45 5 5.70715)" fill="#D17D2F" />
              <rect x="22.6777" y="5" width="1" height="25"
                transform="rotate(45 22.6777 5)" fill="#D17D2F" />
            </svg>
          </button>
        </div>

        <p className="cart__date-delivery">{dateDelivery}</p>

        {status === "loading" ? (
          <div className="cart__preload">
            <Preload />
          </div>
        ) : (
          <ul className="cart__list">
            {goodsInCart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </ul>
        )}

        <div className="cart__footer">
          <button className="cart__order-btn"
            onClick={handlerOrderOpen} 
            disabled={!goodsInCart.length}>Оформить</button>
          <p className="cart__price cart__price_total">
            {goodsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0)}&nbsp;₽</p>
            
        </div>
      </div>
    </section>
  );
};