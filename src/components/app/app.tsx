import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import { AppRoute, AuthorizationStatus } from '../../consts';
import PrivateRoute from '../private-route/private-route';
import {Film as FilmType} from '../../types/film';
import { Review } from '../../types/review';

type AppProps = {
  films: FilmType[];
  reviews: Review[];
};

function App({films, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main currentFilm={films[0]} />} />
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyList films={films} />
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoute.Films}/:id/`}>
            <Route index element={<Film films={films} reviews={reviews} />} />
            <Route path={AppRoute.Review} element={<AddReview films={films} />} />
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player films={films} />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
