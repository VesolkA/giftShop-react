import { useDispatch } from "react-redux";
import { API_URL } from "../../const";
import style from "./CartItem.module.scss";
import { useState } from "react";
import { addItemToCart } from "../../redux/cartSlice";
import { debounce } from "../../util";

export const CartItem = ({ id, photoUrl, name, price, quantity }) => {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);

  const debouceInputChange = debounce((newQuantity) => {
    dispatch(addItemToCart({ product: id, quantity: newQuantity }));
  }, 500);

  const handleInputChange = (e) => {
    const newQuantity = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : '';
    setInputQuantity(newQuantity);
    debouceInputChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = inputQuantity - 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ product: id, quantity: newQuantity }));
  };

  const handleIncrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ product: id, quantity: newQuantity }));
  };

  return (
    <li className={style.item}>
      <img className={style.img}
        src={`${API_URL}${photoUrl}`}
        alt={name} />
      <h4 className={style.title}>{name}</h4>
      <div className={style.counter}>
        <button className={style.btn} onClick={handleDecrement} >-</button>
        <input
          className={style.input}
          type="number"
          max="99"
          min="0"
          value={inputQuantity}
          onChange={handleInputChange} 
          />
        <button className={style.btn} onClick={handleIncrement} >+</button></div>
      <p className={style.price}>{price * inputQuantity}&nbsp;₽</p>
    </li>
  )
};
