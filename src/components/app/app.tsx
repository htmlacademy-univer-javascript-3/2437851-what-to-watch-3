import { Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import { AppRoute } from '../../consts';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainScreen />} />
          <Route path={AppRoute.Login} element={<SignInScreen />} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute>
              <MyListScreen />
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoute.Films}/:id/`}>
            <Route index element={<FilmScreen />} />
            <Route path={AppRoute.Review} element={<AddReviewScreen />} />
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<PlayerScreen />} />
        </Route>
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
