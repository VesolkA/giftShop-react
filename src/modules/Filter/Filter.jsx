// Filter.jsx
import { Choices } from '../Choices/Choices';
import './filter.scss';
import { getValidFilters, debounce } from '../../util';
import { FilterRadio } from './FilterRadio';
import classNames from 'classnames';
import { changeCategory, changePrice, changeType } from '../../redux/slices/filtersSlice';
import { fetchGoods } from '../../redux/thunks/fetchGoods';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

const filterTypes = [
  { title: "Цветы", value: 'bouquets' },
  { title: "Игрушки", value: 'toys' },
  { title: "Открытки", value: 'postcards' },
]

export const Filter = ({ setTitleGoods }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const categories = useSelector(state => state.goods.categories);
  const [openChoice, setOpenChoice] = useState(null);

  const filterRef = useRef();
  const prevFiltersRef = useRef(filters);

  const debouncedFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    if (filters !== prevFiltersRef.current) {
      filterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filters]);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".filter__group_choices");
      if (!target && (openChoice !== null || openChoice !== -1)) {
        setOpenChoice(-1);
      }
    });
  }, [openChoice]);

  useEffect(() => {
    const prevMinPrice = prevFiltersRef.current.minPrice;
    const prevMaxPrice = prevFiltersRef.current.maxPrice;

    const validFilter = getValidFilters(filters);

    if (!validFilter.type && !validFilter.search) {
      return;
    }

    if (
      prevMinPrice !== filters.minPrice ||
      prevMaxPrice !== filters.maxPrice
    ) {
      debouncedFetchGoods(validFilter);
      
    } else {
      dispatch(fetchGoods(validFilter));

      const type = filterTypes.find((item) => item.value === validFilter.type);

      if (type) {
        setTitleGoods(type.title);
      }

      if (validFilter.search) {
        setTitleGoods("Результаты поска:");
      }
    }

    prevFiltersRef.current = filters;
  }, [setTitleGoods, dispatch, debouncedFetchGoods, filters]);

  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handleTypeChange = ({ target }) => {
    const { value } = target;
    dispatch(changeType(value));

    setOpenChoice(-1);
  };

  const handlePriceChange = ({ target }) => {
    const { name, value } = target;
    dispatch(changePrice({ name, value }));
  };

  const handleCategoryChange = (category) => {
    dispatch(changeCategory(category));
    setOpenChoice(-1);
  };

  return (
    <section className="filter" ref={filterRef}>
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            {filterTypes.map((item) => (
              <FilterRadio
                key={item.value}
                handleTypeChange={handleTypeChange}
                data={item}
                type={filters.type}
              />
            ))}
          </fieldset>

          <fieldset className="filter__group filter__group_choices">
            <Choices buttonLabel="Цена"
              isOpen={openChoice === 0}
              onToggle={() => handleChoicesToggle(0)}>
              <fieldset className="filter__price">
                <input
                  className="filter__input-price"
                  type="text"
                  name="minPrice"
                  placeholder="от"
                  value={filters.minPrice}
                  onChange={handlePriceChange}
                />
                <input
                  className="filter__input-price"
                  type="text"
                  name="maxPrice"
                  placeholder="до"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
                />
              </fieldset>
            </Choices>

            {categories.length ? (
              <Choices buttonLabel="Тип товара"
                isOpen={openChoice === 1}
                onToggle={() => handleChoicesToggle(1)}>
                <ul className="filter__type-list">

                <li className="filter__type-item">
                      <button className="filter__type-button"
                        type="button" onClick={() => {
                          handleCategoryChange("");
                        }}><b>Все категории:</b></button>
                    </li>

                  {categories.map((category) => (
                    <li key={category} className="filter__type-item">
                      <button className={classNames("filter__type-button", 
                      category === filters.category ? 'filter__type-button_active' : "")}
                        type="button" onClick={() => {
                          handleCategoryChange(category);
                        }}>{category}</button>
                    </li>
                  ))}
                </ul>
              </Choices>
            ) : null}

          </fieldset>
        </form>
      </div>
    </section>
  );
};

