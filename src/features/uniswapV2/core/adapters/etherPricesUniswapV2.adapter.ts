import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { EtherPricesUniswapV2 } from 'src/features/uniswapV2/core/entities/EtherPricesUniswapV2';

const etherPricesUniswapV2Adapter = ({ current, t1D, t2D, t1W }: EtherPricesUniswapV2): EtherPrices => {
  return {
    current: parseFloat(current[0].ethPrice),
    t1D: parseFloat(t1D[0].ethPrice),
    t2D: parseFloat(t2D[0].ethPrice),
    t1W: parseFloat(t1W[0].ethPrice),
  };
};

export default etherPricesUniswapV2Adapter;
