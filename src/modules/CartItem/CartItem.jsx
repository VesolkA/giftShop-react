// cartItem.jsx
import { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../const";
import style from "./CartItem.module.scss";
import { debounce, isNumber } from "../../util";
import { addItemToCart } from "../../redux/thunks/addItemToCart";

export const CartItem = memo(({ id, photoUrl, name, price }) => {
  const dispatch = useDispatch();
  const goodsInCart = useSelector((state) => state.cart.items);
  const cartItem = goodsInCart.find(item => item.id === id);
  const [inputQuantity, setInputQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    if (cartItem) {
      setInputQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const debounceInputChange = debounce((newQuantity) => {
    if (isNumber(newQuantity)) {
      dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
    }
  }, 100);

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setInputQuantity(newQuantity);
    debounceInputChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = inputQuantity - 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  const handleIncrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  return (
    <li className={style.item}>
      <img className={style.img} src={`${API_URL}${photoUrl}`} alt={name} />
      <h4 className={style.title}>{name}</h4>
      <div className={style.counter}>
        <button className={style.btn} onClick={handleDecrement}>-</button>
        <input
          className={style.input}
          type="number"
          max="99"
          min="0"
          value={inputQuantity}
          onChange={handleInputChange}
        />
        <button className={style.btn} onClick={handleIncrement}>+</button>
      </div>
      <p className={style.price}>
        {inputQuantity ? price * inputQuantity : 0}&nbsp;BYN
      </p>
    </li>
  );
});

CartItem.displayName = "CartItem";

export default CartItem;

