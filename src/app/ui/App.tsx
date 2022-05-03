import { Suspense } from 'react';
import FallbackMessage from 'src/shared/ui/FallbackMessage';
import RouteManager from 'src/app/ui/routes/RouteManager';

function App() {
  return (
    <Suspense fallback={<FallbackMessage message="Loading..." style={{ minHeight: '95vh' }} />}>
      <RouteManager />
    </Suspense>
  );
}

export default App;
