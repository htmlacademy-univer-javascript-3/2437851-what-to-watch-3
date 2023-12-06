import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import { AppRoute } from '../../consts';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import Loading from '../../pages/loading/loading';

function App(): JSX.Element {
  const isLoading = useAppSelector((state) => state.isLoading);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main />} />
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoute.Films}/:id/`}>
            <Route index element={<Film />} />
            <Route path={AppRoute.Review} element={<AddReview />} />
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
