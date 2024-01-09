import cn from 'classnames';
import { Genre } from '../../types/genre';

type GenreItemProps = {
  genre: Genre;
  isActive: boolean;
  onClick: (genre: Genre) => void;
}

function GenreItem({ genre, isActive, onClick }: GenreItemProps): JSX.Element {
  return (
    <li className={cn('catalog__genres-item', {'catalog__genres-item--active': isActive})}>
      <button className="catalog__genres-link" style={{ backgroundColor: 'transparent', border: 0 }} type="button" onClick={() => onClick(genre)}>{genre}</button>
    </li>
  );
}

export default GenreItem;
