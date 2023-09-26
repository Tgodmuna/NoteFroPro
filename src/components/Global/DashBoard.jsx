/* eslint-disable react/jsx-pascal-case */
import React, { Suspense } from "react";

const LazyLoaded_COMP = React.lazy(() => import("./MainApp"));
const DashBoard = () => {
  return (
    <div>
      <Suspense
        fallback={
          <>
            loading <span className='animate-spin  '>.......</span>
          </>
        }>
        <LazyLoaded_COMP />
      </Suspense>
    </div>
  );
};

export default DashBoard;
