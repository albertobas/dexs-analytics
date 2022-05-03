import dayjs from 'dayjs';
import { PoolExtended } from 'src/features/shared/pools/entities/Pools';
import { TokenExtended } from 'src/features/shared/tokens/core/entities/Tokens';
import { PoolsState } from '../state/core/entities/Pools';
import { TokensState } from '../state/core/entities/Tokens';

export const dictPools = {
  tvl: { value: 'tvl', label: 'TVL', description: '' },
  volume24H: { value: 'volume24H', label: 'Volume 24H', description: '' },
  volume1W: { value: 'volume1W', label: 'Volume 7D', description: '' },
  fees24H: { value: 'fees24H', label: 'Fees 24H', description: '' },
  pool: { value: 'pool', label: 'Pool', description: '' },
  pair: { value: 'pair', label: 'Pair', description: '' },
};

const formatAmount = (value: number | undefined, decimals: number | undefined = 2) => {
  if (typeof value === 'undefined') {
    return '-';
  } else {
    if (value >= 1e9) return (value / 1e9).toFixed(decimals) + 'b';
    else if (value >= 1e6) return (value / 1e6).toFixed(decimals) + 'm';
    else if (value >= 1e3) return (value / 1e3).toFixed(decimals) + 'k';
    else if (Math.abs(value) < 0.01) return '0.00';
    // fix decimals, remove trianling zeros and convert back to string
    else return parseFloat(value.toFixed(decimals)).toString();
  }
};

export const formatAmountCurrency = (value: number | undefined, decimals: number | undefined = 2): string => {
  if (typeof value === 'undefined') {
    return '-';
  } else {
    const formattedValue = formatAmount(value, decimals);
    return '$' + formattedValue;
  }
};

export const formatAmountPercentage = (value: number | undefined, decimals: number | undefined = 2): string => {
  if (typeof value === 'undefined') {
    return '-';
  } else {
    const formattedValue = formatAmount(value, decimals);
    return formattedValue + '%';
  }
};

const validateAmount = (value: number) => {
  if (!isNaN(value) || isFinite(value)) return value;
  else return null;
};

export const getPercentage = (value: number) => {
  const validatedAmount = validateAmount(value);
  return validatedAmount ? validatedAmount.toFixed(2) + '%' : '-';
};

export const getPercentChange = (valueCurrent: number, valuePrevious: number): number => {
  const change = ((valueCurrent - valuePrevious) / valuePrevious) * 100;
  const validatedChange = validateAmount(change);
  return validatedChange ?? 0;
};

export const getTime = () => {
  // return time in seconds
  return new Date().getTime() / 1000;
};

export const getTimestamps = (): [number, number, number] => {
  const utcCurrent = dayjs();
  const t1D = utcCurrent.startOf('minute').subtract(1, 'day').unix();
  const t2D = utcCurrent.startOf('minute').subtract(2, 'day').unix();
  const t1W = utcCurrent.startOf('minute').subtract(1, 'week').unix();
  return [t1D, t2D, t1W];
};

export const get2DayChange = (valueCurrent: number, value1D: number, value2D: number): [number, number] => {
  const currentChange = valueCurrent - value1D;
  const previousChange = value1D - value2D;
  const percentChange = getPercentChange(currentChange, previousChange);
  return [currentChange, percentChange];
};

export function searchPools(pools: PoolExtended[], query: string): PoolExtended[] {
  return pools.filter(
    (pool) =>
      pool.token0.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      pool.token0.symbol.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      pool.token0.address.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      pool.token1.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      pool.token1.symbol.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      pool.token1.address.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      (pool.token0.symbol + '/' + pool.token1.symbol).toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}

export function searchTokens(tokens: TokenExtended[], query: string): TokenExtended[] {
  return tokens.filter(
    (token) =>
      token.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      token.symbol.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      token.address.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}

export const sortTokens = (data: TokenExtended[], sortValue: string | undefined, reverse: boolean): TokenExtended[] => {
  if (reverse) {
    if (sortValue === 'token') {
      return data.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0));
    } else if (sortValue === 'price') {
      return data.sort((a, b) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0));
    } else if (sortValue === 'volume24H') {
      return data.sort((a, b) =>
        a.volume && b.volume
          ? a.volume < b.volume
            ? -1
            : a.volume > b.volume
            ? 1
            : 0
          : a.volume
          ? 1
          : b.volume
          ? -1
          : 0
      );
    } else if (sortValue === 'tvl') {
      return data.sort((a, b) => (a.tvl < b.tvl ? -1 : a.tvl > b.tvl ? 1 : 0));
    } else return data;
  } else {
    if (sortValue === 'token') {
      return data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    } else if (sortValue === 'price') {
      return data.sort((a, b) => (a.price > b.price ? -1 : a.price < b.price ? 1 : 0));
    } else if (sortValue === 'volume24H') {
      return data.sort((a, b) =>
        a.volume && b.volume
          ? a.volume > b.volume
            ? -1
            : a.volume < b.volume
            ? 1
            : 0
          : a.volume
          ? -1
          : b.volume
          ? 1
          : 0
      );
    } else if (sortValue === 'tvl') {
      return data.sort((a, b) => (a.tvl > b.tvl ? -1 : a.tvl < b.tvl ? 1 : 0));
    } else return data;
  }
};

export const sortPools = (data: PoolExtended[], sortValue: string | undefined, reverse: boolean): PoolExtended[] => {
  if (reverse) {
    if (sortValue === 'pool' || sortValue === 'pair') {
      return data.sort((a, b) => (a.token0.name > b.token0.name ? -1 : a.token0.name < b.token0.name ? 1 : 0));
    } else if (sortValue === 'tvl') {
      return data.sort((a, b) => (a.tvl < b.tvl ? -1 : a.tvl > b.tvl ? 1 : 0));
    } else if (sortValue === 'volume24H') {
      return data.sort((a, b) =>
        a.volume && b.volume
          ? a.volume < b.volume
            ? -1
            : a.volume > b.volume
            ? 1
            : 0
          : a.volume
          ? 1
          : b.volume
          ? -1
          : 0
      );
    } else if (sortValue === 'volume1W') {
      return data.sort((a, b) =>
        a.volume1W && b.volume1W
          ? a.volume1W < b.volume1W
            ? -1
            : a.volume1W > b.volume1W
            ? 1
            : 0
          : a.volume1W
          ? 1
          : b.volume1W
          ? -1
          : 0
      );
    } else if (sortValue === 'fees24H') {
      return data.sort((a, b) => (a.fees < b.fees ? -1 : a.fees > b.fees ? 1 : 0));
    } else return data;
  } else {
    if (sortValue === 'pool' || sortValue === 'pair') {
      return data.sort((a, b) => (a.token0.name < b.token0.name ? -1 : a.token0.name > b.token0.name ? 1 : 0));
    } else if (sortValue === 'tvl') {
      return data.sort((a, b) => (a.tvl > b.tvl ? -1 : a.tvl < b.tvl ? 1 : 0));
    } else if (sortValue === 'volume24H') {
      return data.sort((a, b) =>
        a.volume && b.volume
          ? a.volume > b.volume
            ? -1
            : a.volume < b.volume
            ? 1
            : 0
          : a.volume
          ? -1
          : b.volume
          ? 1
          : 0
      );
    } else if (sortValue === 'volume1W') {
      return data.sort((a, b) =>
        a.volume1W && b.volume1W
          ? a.volume1W > b.volume1W
            ? -1
            : a.volume1W < b.volume1W
            ? 1
            : 0
          : a.volume1W
          ? -1
          : b.volume1W
          ? 1
          : 0
      );
    } else if (sortValue === 'fees24H') {
      return data.sort((a, b) => (a.fees > b.fees ? -1 : a.fees < b.fees ? 1 : 0));
    } else return data;
  }
};

export const shouldFetch = (state: PoolsState | TokensState, network: string | null | undefined) => {
  // Should fetch data if they have not been fetched already or if they have been fetched more than 15 mins ago
  const time = getTime();
  const databyNetwork = state.data && network && state.data[network];
  const lastUpdated = databyNetwork ? databyNetwork.lastUpdated : null;
  return databyNetwork == null || lastUpdated == null ? true : lastUpdated < time - 900;
};
