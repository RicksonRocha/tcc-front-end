import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import App from './app';
import { store } from './api/store';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
  </Provider>
);
