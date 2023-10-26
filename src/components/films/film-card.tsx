import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { Film } from '../../types/film';

type FilmCardProps = {
  film: Film;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

function FilmCard({ film, onMouseEnter, onMouseLeave }: FilmCardProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => onMouseEnter(film.id)} onMouseLeave={onMouseLeave} onClick={() => navigate(`/${AppRoute.Films}/${film.id}`)}>
      <div className="small-film-card__image">
        <img src={film.posterImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className='small-film-card__link'>
          {film.name}
        </a>
      </h3>
    </article>
  );
}

export default FilmCard;
