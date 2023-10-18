import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import SignIn from '../../pages/signIn/signIn';
import MyList from '../../pages/myList/myList';
import Film from '../../pages/film/film';
import AddReview from '../../pages/addReview/addReview';
import Player from '../../pages/player/player';
import { AppRoute, AuthorizationStatus } from '../../consts';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main title='The Grand Budapest Hotel' genre='Drama' year={2014} />} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Film} element={<Film />} />
        <Route path={AppRoute.AddReview} element={<AddReview />} />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
