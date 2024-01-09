import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth, fetchFavoriteFilms, fetchFilms, fetchPromoFilm } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilms());
store.dispatch(fetchPromoFilm());
store.dispatch(fetchFavoriteFilms());
store.dispatch(checkAuth());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
