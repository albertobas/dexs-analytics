import React from 'react';
import ReactDOM from 'react-dom';
import 'src/app/styles/index.css';
import App from 'src/app/ui/App';
import { Provider } from 'react-redux';
import { store } from 'src/app/state/store';
import { BrowserRouter } from 'react-router-dom';
import LayoutSite from 'src/app/ui/layout/LayoutSite';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LayoutSite>
          <App />
        </LayoutSite>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
