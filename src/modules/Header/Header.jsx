import { useDispatch, useSelector } from 'react-redux';
import style from './Header.module.scss';
import { useRef, useState } from 'react';
import { toggleCart } from '../../redux/slices/cartSlice';
// import { fetchGoods } from '../../redux/thunks/fetchGoods';
import { changeSearch } from '../../redux/slices/filtersSlice';
import classNames from 'classnames';

export const Header = () => { 
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [searchValue, setSearchValue] = useState("");


  const searchInputRef = useRef(null);

  const handlerCartToggle = () => {
    dispatch(toggleCart());
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (searchValue.trim() !== "") {
    searchInputRef.current.style.cssText = "";
    dispatch(changeSearch(searchValue));
    setSearchValue("");
  } else {
    searchInputRef.current.style.cssText = `
      outline: 2px solid tomato;
      outlineOffset: 5px;
   `;

    setTimeout(() => {
      searchInputRef.current.style.cssText = "";
    }, 2000);
  }
};

  return (
  <header className={style.header}>
    <div className={classNames(style.container, "container")} >
      <form className={style.form} action="#" onSubmit={handleSubmit}>
        <input 
        className={style.input} 
        type="search" 
        name="search"
        placeholder="Букет из роз"
        value={searchValue} 
        onChange={(e) => setSearchValue(e.target.value)}
        ref={searchInputRef}
          />

        <button className={style['search-button']} aria-label="начать поиск">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.3333 4.16663C13.3333 4.78496 13.9442 5.70829 14.5625 6.48329C15.3575 7.48329 16.3075 8.35579 17.3967 9.02163C18.2133 9.52079 19.2033 9.99996 20 9.99996M20 9.99996C19.2033 9.99996 18.2125 10.4791 17.3967 10.9783C16.3075 11.645 15.3575 12.5175 14.5625 13.5158C13.9442 14.2916 13.3333 15.2166 13.3333 15.8333M20 9.99996H4.76837e-07"
              stroke="white" />
          </svg>
        </button>
      </form>

      <img className={style.logo} src="/img/logo.svg"
        alt="Логотип Mirano Flower Boutique" />

      <button className={style['cart-button']} 
      onClick={handlerCartToggle}>
      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      </button>
    </div>
  </header>
  
);
};