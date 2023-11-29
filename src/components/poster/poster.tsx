import { buildClassName } from '../../helpers/class-name-builder';
import { AdditionalClassName } from '../../types/additional-class-name';

type PosterProps = {
  film: {
    posterImage: string;
    name: string;
  };
} & AdditionalClassName;

function Poster({film, additionalClassName}: PosterProps): JSX.Element {
  return (
    <div className={buildClassName('film-card__poster', additionalClassName)}>
      <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
    </div>
  );
}

export default Poster;
