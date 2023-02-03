import { useMemo, useState } from 'react';
import Pagination from 'src/features/shared/pagination/ui/Pagination';
import { TokensState } from 'src/features/shared/tokens/core/entities/Tokens';
import { TokenExtended } from 'src/features/shared/tokens/core/entities/Tokens';
import FallbackMessage from 'src/shared/ui/FallbackMessage';
import TokensTable from 'src/features/shared/tokens/ui/TokensTable';
import styles from 'src/features/shared/tokens/styles/tableToken.module.css';
import { searchTokens } from 'src/features/shared/utils/helpers';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';

const TokensTablePagination = ({ loading, error, data }: TokensState) => {
  // get protocol attributes
  const protocolState = useAppSelector((state) => state.protocol);

  // get query
  const query = useAppSelector((state) =>
    protocolState.data
      ? protocolState.data.name === 'uniswap-v2'
        ? state.search.queryUniswapV2
        : protocolState.data.name === 'uniswap-v3'
        ? state.search.queryUniswapV3
        : null
      : null
  );

  // get filtered tokens
  const tokenData = useMemo(() => {
    if (data && protocolState.data && data[protocolState.data.network]) {
      const tokens = Object.values(data[protocolState.data.network].tokens).map((p: TokenExtended) => p);
      if (query) return searchTokens(tokens, query);
      else return tokens;
    } else return null;
  }, [data, query, protocolState.data]);

  // pagination
  const itemsPerPage = 10;
  const [pageNum, setPageNum] = useState<number>(0);

  return (
    <div className={styles.containerOuter}>
      <div className={styles.containerInner}>
        <div className={styles.table}>
          {loading ? (
            <FallbackMessage message="Loading..." />
          ) : error ? (
            <FallbackMessage message="There has been a problem." />
          ) : tokenData ? (
            <>
              <TokensTable data={tokenData} itemsPerPage={itemsPerPage} pageNum={pageNum} />
              <Pagination
                dataLength={tokenData.length}
                itemsPerPage={itemsPerPage}
                currentPage={pageNum}
                setCurrentPage={setPageNum}
              />
            </>
          ) : (
            <FallbackMessage message="No info available" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokensTablePagination;
