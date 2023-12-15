import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/films-process/selectors';
import { FilmDetails, PromoFilm } from '../../types/film';
import { changeFavoriteFilm } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useNavigate } from 'react-router-dom';

type FavoriteListProps = {
  film: FilmDetails | PromoFilm;
}

function FavoriteList({film}: FavoriteListProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleChangeFilmStatus = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(`/${AppRoute.Login}`);
    } else {
      dispatch(changeFavoriteFilm({filmId: film.id, status: Number(!film.isFavorite)}));
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleChangeFilmStatus}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={film.isFavorite ? '#in-list' : '#add' } />
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}

export default FavoriteList;
