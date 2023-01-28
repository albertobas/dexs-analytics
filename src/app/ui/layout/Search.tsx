import { setQueryUniswapV2, setQueryUniswapV3 } from 'src/app/state/searchSlice';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import styles from 'src/app/styles/modules/layout/search.module.css';

const Search = () => {
  const dispatch = useAppDispatch();
  const { error, data } = useAppSelector((state) => state.protocol);

  const query = useAppSelector((state) =>
    data
      ? data.name === 'uniswap-v2'
        ? state.search.queryUniswapV2
        : data.name === 'uniswap-v3'
        ? state.search.queryUniswapV3
        : null
      : null
  );

  if (error || !data) {
    return <></>;
  }
  const { name } = data;

  const handleSearch = (value: string) => {
    if (name === 'uniswap-v2') {
      dispatch(setQueryUniswapV2(value));
    } else if (name === 'uniswap-v3') {
      dispatch(setQueryUniswapV3(value));
    }
  };

  return (
    <div className={styles.search}>
      <input
        id="search-input"
        type="search"
        autoComplete="off"
        value={query ? query : ''}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={'Search pools or tokens...'}
      />
    </div>
  );
};

export default Search;
