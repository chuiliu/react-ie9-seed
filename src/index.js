// import 'raf/polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

renderWithHotReload(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    renderWithHotReload(App);
  });
}

function renderWithHotReload(App) {
  ReactDom.render(
    <AppContainer>
      <HashRouter>
        <App key={Math.random()} />
      </HashRouter>
    </AppContainer>,
    document.getElementById('app')
  );
}


