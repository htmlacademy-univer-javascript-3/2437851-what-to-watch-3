import { useNavigate } from 'react-router-dom';
import { Film, PromoFilm } from '../../types/film';
import { AppRoute } from '../../consts';

type PlayProps = {
  film: Film | PromoFilm;
}

function Play({film}: PlayProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/${AppRoute.Player}/${film.id}`)}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default Play;
