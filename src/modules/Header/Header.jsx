// Header.jsx
import { useDispatch, useSelector } from 'react-redux';
import style from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import { toggleCart } from '../../redux/slices/cartSlice';
// import { fetchGoods } from '../../redux/thunks/fetchGoods';
// import { changeSearch } from '../../redux/slices/filtersSlice';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // add
import { changeSearch } from '../../redux/slices/filtersSlice';

export const Header = () => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // add with help
  const navigate = useNavigate(); // Создать navigate

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
      navigate(`/search?query=${searchValue}`);  // Перенаправление на страницу результатов поиска
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={style.header}>
      <div className={classNames(style.container, "container")}>
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

        {menuOpen ? (
          <button className={style.burgerClose} onClick={toggleMenu}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3.35425" width="1.91529" height="32.6356" transform="rotate(-45 2 3.35425)" fill="#D17D2F" />
              <rect x="25.0768" y="2" width="1.88404" height="32.6356" transform="rotate(45 25.0768 2)" fill="#D17D2F" />
            </svg>
          </button>
        ) : (
          <button className={style.burger} onClick={toggleMenu}>
            <span className={style.burgerLine}></span>
            <span className={style.burgerLine}></span>
            <span className={style.burgerLine}></span>
          </button>
        )}

        <nav className={classNames(style.nav, { [style.navOpen]: menuOpen })}>
          <ul className={style.navLists}>
            <li className={style.list}>
              <Link className={style.link} to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
            </li>
            <li className={style.list}>
              <Link className={style.link} to="/blog" onClick={() => setMenuOpen(false)}>Блог</Link>
            </li>
            <li className={style.list}>
              <Link className={style.link} to="/about" onClick={() => setMenuOpen(false)}>О&nbsp;нас</Link>
            </li>
          </ul>
        </nav>

        <button className={style['cart-button']} onClick={handlerCartToggle}>
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </button>
      </div>
    </header>
  );
};