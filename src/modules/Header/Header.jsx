import { useDispatch, useSelector } from 'react-redux';
import './header.scss';
import { toggleCart } from '../../redux/cartSlice';
import { useState } from 'react';
import { fetchGoods } from '../../redux/goodsSlice';
import { changeType } from '../../redux/filtersSlice';


export const Header = ({ setTitleGoods, goodsRef }) => { // добавили goodsRef
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [seacrhValue, setSearchValue] = useState("");

  const handlerCartToggle = () => {
    dispatch(toggleCart());
};

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(fetchGoods({ search: seacrhValue }));
  setTitleGoods('Результат поиска:');
  setSearchValue('');
  dispatch(changeType('')); // обнуляем состояние типов фильтров при поиске

      // Скроллим к блоку goods
      if (goodsRef && goodsRef.current) {
        goodsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
};

  return (
  <header className="header">
    <div className="container header__container">
      <form className="header__form" action="#" onSubmit={handleSubmit}>
        <input 
        className="header__input" 
        type="search" 
        name="search"
        placeholder="Букет из роз"
        value={seacrhValue} 
        onChange={(e) => setSearchValue(e.target.value)}
          />

        <button className="header__search-button" aria-label="начать поиск">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.3333 4.16663C13.3333 4.78496 13.9442 5.70829 14.5625 6.48329C15.3575 7.48329 16.3075 8.35579 17.3967 9.02163C18.2133 9.52079 19.2033 9.99996 20 9.99996M20 9.99996C19.2033 9.99996 18.2125 10.4791 17.3967 10.9783C16.3075 11.645 15.3575 12.5175 14.5625 13.5158C13.9442 14.2916 13.3333 15.2166 13.3333 15.8333M20 9.99996H4.76837e-07"
              stroke="white" />
          </svg>
        </button>
      </form>

      <img className="header__logo" src="/img/logo.svg"
        alt="Логотип Mirano Flower Boutique" />

      <button className="header__cart-button" 
      onClick={handlerCartToggle}>
      {cartItems.length}
      </button>
    </div>
  </header>
);
};