import React, { Suspense } from 'react';

import CardLoading from './card_loading';

const PageWrapper = ({ children }) => {
  return <Suspense fallback={<CardLoading />}>{children}</Suspense>;
};

export default PageWrapper;
