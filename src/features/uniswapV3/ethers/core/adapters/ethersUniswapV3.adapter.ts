import { Ethers } from 'src/features/shared/ethers/core/entities/Ethers';
import { EthersUniswapV3 } from 'src/features/uniswapV3/ethers/core/entities/EthersUniswapV3';

const ethersUniswapV3Adapter = (dataRaw: EthersUniswapV3 | undefined): Ethers | null => {
  if (dataRaw) {
    const data: Ethers = {
      current: { ethPrice: parseFloat(dataRaw.current[0].ethPriceUSD) },
      t1D: { ethPrice: parseFloat(dataRaw.t1D[0].ethPriceUSD) },
      t2D: { ethPrice: parseFloat(dataRaw.t2D[0].ethPriceUSD) },
      t1W: { ethPrice: parseFloat(dataRaw.t1W[0].ethPriceUSD) },
    };
    return data;
  } else return null;
};

export default ethersUniswapV3Adapter;
