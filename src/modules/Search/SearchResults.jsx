// SearchResults.jsx
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchGoods } from '../../redux/thunks/fetchGoods';
import { Goods } from '../Goods/Goods';
import { Filter } from '../Filter/Filter';

export const SearchResults = ({ setTitleGoods }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      dispatch(fetchGoods({ search: query }));
      setTitleGoods("Результаты поиска:");
    }
  }, [query, dispatch, setTitleGoods]);

  const goods = useSelector((state) => state.goods.items);
  const status = useSelector((state) => state.goods.status);
  const error = useSelector((state) => state.goods.error);

  return (
    <section>
      <Filter setTitleGoods={setTitleGoods} />
      <Goods title="Результаты поиска" items={goods} status={status} error={error} />
    </section>
  );
};

export default SearchResults;
