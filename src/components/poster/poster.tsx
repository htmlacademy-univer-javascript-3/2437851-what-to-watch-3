import { buildClassName } from '../../helpers/class-name-builder';
import { AdditionalClassName } from '../../types/additional-class-name';
import { Film } from '../../types/film';

type PosterProps = {
  film: Film;
} & AdditionalClassName;

function Poster({film, additionalClassName}: PosterProps): JSX.Element {
  return (
    <div className={buildClassName('film-card__poster', additionalClassName)}>
      <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
    </div>
  );
}

export default Poster;
