import { useDispatch, useSelector } from 'react-redux';
import style from './Order.module.scss';
import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import { closeModal, updateOrderData } from '../../redux/slices/orderSlice';
import { sendOrder } from '../../redux/thunks/sendOrder';


export const Order = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.order.isOpen);
  const orderId = useSelector((state) => state.order.orderId);
  const orderData = useSelector((state) => state.order.data);
  const itemsFullSum =useSelector((state) => state.cart.items);

  
  const handlerClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateOrderData({
      [name]: value,
    }),
  );
};

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(sendOrder());
};

const calcDeliveryDate = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  if (currentHour < 19) {
    return currentDate.toISOString().split('T')[0];
  } else {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  }
};

const getMinDeliveryDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString().split('T')[0];
};

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Ecscape') {
        handlerClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      const initialDeliveryDate = calcDeliveryDate();
      dispatch(updateOrderData({ deliveryDate: initialDeliveryDate }));
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, handlerClose, dispatch]);

  if (!isOpen) return null;

  return (
    <div className={style.order} onClick={handlerClose}>

      <div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
        {orderId ? (
          <>
            <h2 className={style.title}>Заказ оформлен!</h2>
            {<p className={style.id}>Ваш номер заказа: { orderId }</p>}
          </>
        ) : (
          <>
            <h2 className={style.title}>Оформить заказ</h2>
            <form className={style.form} id="order" onSubmit={handleSubmit}>
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Данные заказчика</legend>
                <div className={style['input-group']}>
                  <input className={style.input} 
                  type="text" 
                  name="buyerName" 
                  placeholder="Имя"
                  value={orderData.buyerName}
                  onChange={handleChange}
                  />
                  <input className={style.input} 
                  type="text" 
                  name="buyerPhone" 
                  placeholder="Телефон"
                  value={orderData.buyerPhone}
                  onChange={handleChange}
                  />
                </div>
              </fieldset>

              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Данные получателя</legend>
                <div className={style['input-group']}>
                  <input className={style.input} 
                  type="text" 
                  name="recipientName" 
                  placeholder="Имя"
                  value={orderData.recipientName}
                  onChange={handleChange}
                  required
                  />
                  <input className={style.input} 
                  type="text" 
                  name="recipientPhone" 
                  placeholder="Телефон"
                  value={orderData.recipientPhone}
                  onChange={handleChange}
                  required
                  />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Адрес</legend>
                <div className={style['input-group']}>
                  <input className={style.input} 
                  type="text" 
                  name="street" 
                  placeholder="Улица"
                  value={orderData.street}
                  onChange={handleChange}
                  required
                  />
                  <input className={classNames(style.input, style.input_min)} 
                  type="text" 
                  name="house" 
                  placeholder="Дом"
                  value={orderData.house}
                  onChange={handleChange}
                  required
                  />
                  <input className={classNames(style.input, style.input_min)} 
                  type="text" 
                  name="apartment" 
                  placeholder="Квартира"
                  value={orderData.apartment}
                  onChange={handleChange}
                  required
                  />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <div className={style.payment}>
                  <label className={style['label-radio']}>
                    <input className={style.radio} 
                    type="radio" 
                    name="paymentOnline" 
                    value={orderData.paymentOnline === "true"}
                    defaultChecked
                    />
                    Оплата онлайн
                  </label>
                </div>
                <div className={style.delivery}>
                  <label htmlFor="delivery">Дата доставки:</label>
                  <input 
                  className={style.input}
                  type="date" 
                  name="deliveryDate" 
                  min={getMinDeliveryDate()}
                  value={orderData.deliveryDate}
                  onChange={handleChange}
                  required
                  />
                  <div className={style['select-wrapper']}>
                    <select className={style.select} 
                    name="deliveryTime" 
                    id="delivery"
                    value={orderData.deliveryTime}
                    onChange={handleChange}
                    required
                    >
                      <option value="9-12">с 9:00 до 12:00</option>
                      <option value="12-15">с 12:00 до 15:00</option>
                      <option value="15-18">с 15:00 до 18:00</option>
                      <option value="18-21">с 18:00 до 21:00</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </form>
            <div className={style.footer}>
              <p className={style.total}>
              {itemsFullSum.reduce((acc, item) => acc + item.price * item.quantity, 0)}&nbsp;₽</p>
              <button className={style.button} type="submit" form="order">Заказать</button>
            </div>
          </>
        )}
      </div>
      <button className={style.close} type="button">
          <svg width="30" height="30" viewBox="0 0 28 28" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5.70715" width="1" height="25"
              transform="rotate(-45 5 5.70715)" fill="#D17D2F" />
            <rect x="22.6777" y="5" width="1" height="25"
              transform="rotate(45 22.6777 5)" fill="#D17D2F" />
          </svg>
        </button>
    </div>
  );
};
