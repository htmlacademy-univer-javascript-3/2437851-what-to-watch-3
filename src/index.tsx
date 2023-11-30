import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchFilms, fetchPromoFilm } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilms());
store.dispatch(fetchPromoFilm());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
