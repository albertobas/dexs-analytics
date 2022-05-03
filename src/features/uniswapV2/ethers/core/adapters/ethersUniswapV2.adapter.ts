import { Ethers } from 'src/features/shared/ethers/core/entities/Ethers';
import { EthersUniswapV2 } from 'src/features/uniswapV2/ethers/core/entities/EthersUniswapV2';

const ethersUniswapV2Adapter = (dataRaw: EthersUniswapV2 | undefined): Ethers | null => {
  if (dataRaw) {
    const data: Ethers = {
      current: { ethPrice: parseFloat(dataRaw.current[0].ethPrice) },
      t1D: { ethPrice: parseFloat(dataRaw.t1D[0].ethPrice) },
      t2D: { ethPrice: parseFloat(dataRaw.t2D[0].ethPrice) },
      t1W: { ethPrice: parseFloat(dataRaw.t1W[0].ethPrice) },
    };
    return data;
  } else return null;
};

export default ethersUniswapV2Adapter;
