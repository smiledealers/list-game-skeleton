import 'tachyons';
import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import PageWrapper from 'components/page_wrapper';
import Play from 'pages/play';

const App = () => (
  <PageWrapper>
    <Play />
  </PageWrapper>
);

render(<App />, document.getElementById('app-root'));
