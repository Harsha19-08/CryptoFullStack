import React, { Suspense } from 'react';
import Banner from '../Banner/Banner';
import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from '../ErrorBoundary';

const CoinsTable = React.lazy(() => import('../CoinsTable'));

function Homepage() {
  return (
    <div>
      <Banner />
      <ErrorBoundary FallbackComponent={fallbackRender} onReset={() => {}}>
        <Suspense fallback={<div>Loading..</div>}>
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Homepage;
