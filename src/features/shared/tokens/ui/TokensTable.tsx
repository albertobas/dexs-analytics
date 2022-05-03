import { useCallback, useEffect, useMemo, useState } from 'react';
import { Item } from 'src/features/shared/utils/core/entities/Item';
import { TokenExtended } from 'src/features/shared/tokens/core/entities/Tokens';
import RowTableToken from 'src/features/shared/tokens/ui/RowTableToken';
import { dictTokens } from 'src/features/shared/tokens/utils';
import styles from 'src/features/shared/tokens/styles/tableToken.module.css';
import { sortTokens } from 'src/features/shared/utils/utils';

type Props = { data: TokenExtended[]; itemsPerPage: number; pageNum: number };

const TokensTable = ({ data, itemsPerPage, pageNum }: Props) => {
  // get sorted data
  const [sort, setSort] = useState<Item | null>({
    value: dictTokens.tvl.value,
    label: dictTokens.tvl.label,
  });

  const [reverse, setReverse] = useState<boolean>(false);
  const sortedData = useMemo(
    () => (sort ? sortTokens(data.slice(), sort.value, reverse) : data),
    [data, sort, reverse]
  );

  // set data state
  const [stateData, setStateData] = useState<TokenExtended[]>(data.slice(0, itemsPerPage));
  useEffect(() => {
    const start = itemsPerPage * pageNum;
    setStateData((sort ? sortedData : data).slice(start, start + itemsPerPage));
  }, [data, sortedData, itemsPerPage, sort, pageNum]);

  // handle sort and reverse
  const handleSort = useCallback(
    (item: Item) => {
      if (sort?.value === item.value) setReverse((v) => !v);
      else setReverse(false);
      item ? setSort(item) : setSort(null);
    },
    [setSort, sort?.value]
  );
  const sortArrow = reverse ? '↑' : '↓';
  return (
    <>
      <h2>Tokens</h2>
      <div className={styles.headers}>
        <div>#</div>
        <div>
          <span onClick={() => handleSort({ value: dictTokens.token.value, label: dictTokens.token.label })}>
            {dictTokens.token.label + (sort?.value === dictTokens.token.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
        <div id={styles.headerPrice}>
          <span onClick={() => handleSort({ value: dictTokens.price.value, label: dictTokens.price.label })}>
            {dictTokens.price.label + (sort?.value === dictTokens.price.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
        <div>
          <span onClick={() => handleSort({ value: dictTokens.volume24H.value, label: dictTokens.volume24H.label })}>
            {dictTokens.volume24H.label + (sort?.value === dictTokens.volume24H.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
        <div id={styles.headerTvl}>
          <span onClick={() => handleSort({ value: dictTokens.tvl.value, label: dictTokens.tvl.label })}>
            {dictTokens.tvl.label + (sort?.value === dictTokens.tvl.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
      </div>
      {stateData.map((token, index) => {
        const rowIdx = index + 1 + pageNum * itemsPerPage;
        //const rowId = token.name + ' (' + token.symbol + ')';
        return <RowTableToken key={token.address} rowIdx={rowIdx} {...token} />;
      })}
    </>
  );
};

export default TokensTable;
