import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/films-process/selectors';
import { FilmDetails, PromoFilm } from '../../types/film';
import { setIsFavoriteFilm } from '../../store/api-actions';
import { getAuthorizationDetails } from '../../store/user-process/selectors';
import { AppRoute } from '../../consts';
import { useNavigate } from 'react-router-dom';

type AddToFavoriteListBlockProps = {
  film: FilmDetails | PromoFilm;
}

function AddToFavoriteListBlock({film}: AddToFavoriteListBlockProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authorizationDetails = useAppSelector(getAuthorizationDetails);

  const handleChangeFilmStatus = () => {
    if (!authorizationDetails) {
      navigate(`/${AppRoute.Login}`);
    } else {
      dispatch(setIsFavoriteFilm({filmId: film.id, status: Number(!film.isFavorite)}));
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

export default AddToFavoriteListBlock;
