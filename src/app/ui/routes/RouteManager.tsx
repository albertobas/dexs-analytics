import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('src/app/ui/pages/Home'));
const NotFound = lazy(() => import('src/app/ui/pages/NotFound'));
const Overview = lazy(() => import('src/app/ui/pages/Overview'));
const Pools = lazy(() => import('src/app/ui/pages/Pools'));
const Tokens = lazy(() => import('src/app/ui/pages/Tokens'));

const RouteManager = () => {
  return (
    <Routes>
      <Route path="/:blockchainId/:protocolId/tokens" element={<Tokens />} />
      <Route path="/:blockchainId/:protocolId/pools" element={<Pools />} />
      <Route path="/:blockchainId/:protocolId/pairs" element={<Pools />} />
      <Route path="/:blockchainId/:protocolId/:networkId/tokens" element={<Tokens />} />
      <Route path="/:blockchainId/:protocolId/:networkId/pools" element={<Pools />} />
      <Route path="/:blockchainId/:protocolId/:networkId/pairs" element={<Pools />} />
      <Route path="/:blockchainId/:protocolId/:networkId" element={<Overview />} />
      <Route path="/:blockchainId/:protocolId" element={<Overview />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteManager;
