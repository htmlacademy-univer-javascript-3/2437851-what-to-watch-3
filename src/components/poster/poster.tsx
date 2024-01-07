import cn from 'classnames';
import { FilmDetails, PromoFilm } from '../../types/film';

type PosterProps = {
  film: FilmDetails | PromoFilm;
  sizeModifier?: 'big' | 'small';
};

function Poster({film, sizeModifier}: PosterProps): JSX.Element {
  return (
    <div className={cn('film-card__poster', {'film-card__poster--big': sizeModifier === 'big', 'film-card__poster--small': sizeModifier === 'small'})}>
      <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
    </div>
  );
}

export default Poster;
