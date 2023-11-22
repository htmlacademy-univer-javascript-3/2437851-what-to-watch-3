import { buildClassName } from '../../helpers/class-name-builder';

type GenreProps = {
  genre: string;
  isActive: boolean;
  onClick: (g: string) => void;
}

function Genre({genre, isActive, onClick}: GenreProps): JSX.Element {
  return (
    <li className={buildClassName('catalog__genres-item', isActive ? 'catalog__genres-item--active' : undefined)}>
      <div className="catalog__genres-link" onClick={() => onClick(genre)}>{genre}</div>
    </li>
  );
}

export default Genre;
