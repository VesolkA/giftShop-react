import './order.scss';

export const OrderReady = () => (
  <div className="order order-ready" style={{ display: 'none' }}>
    <div className="order__wrapper">
      <h2 className="order__title">Заказ оформлен!</h2>
      <p className="order__id">Ваш номер заказа:
        971</p>
    </div>
  </div>
)