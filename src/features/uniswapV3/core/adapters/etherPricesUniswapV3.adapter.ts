import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { EtherPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/EtherPricesUniswapV3';

const etherPricesUniswapV3Adapter = ({ current, t1D, t2D, t1W }: EtherPricesUniswapV3): EtherPrices => {
  return {
    current: parseFloat(current[0].ethPriceUSD),
    t1D: parseFloat(t1D[0].ethPriceUSD),
    t2D: parseFloat(t2D[0].ethPriceUSD),
    t1W: parseFloat(t1W[0].ethPriceUSD),
  };
};

export default etherPricesUniswapV3Adapter;
