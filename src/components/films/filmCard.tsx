import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

type FilmCardDecoration = {
  title: string;
  posterPath: string;
}

function FilmCard({title, posterPath}: FilmCardDecoration): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterPath} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>{title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
