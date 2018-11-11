// import 'raf/polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRouter from './routes/index';

renderWithHotReload(AppRouter);

if (module.hot) {
  module.hot.accept('./routes/index', () => {
    const AppRouter = require('./routes/index').default;
    renderWithHotReload(AppRouter);
  });
}

function renderWithHotReload(AppRouter) {
  ReactDom.render(
    <AppContainer>
      <AppRouter key={Math.random()} />
    </AppContainer>,
    document.getElementById('app')
  );
}


