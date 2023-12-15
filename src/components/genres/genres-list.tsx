import Genre from './genre';
import { useDispatch } from 'react-redux';
import { Genre as GenreType } from '../../types/genre';
import { useAppSelector } from '../../hooks';
import { getGenre } from '../../store/films-process/selectors';
import { loadFilms, selectGenre } from '../../store/films-process/films-process';

type GenresListProps = {
  genres: GenreType[];
}

function GenresList({genres}: GenresListProps): JSX.Element {
  const allGenres = [...new Set(genres)] as [GenreType | undefined];
  allGenres.unshift(undefined);

  const dispatch = useDispatch();
  const selectedGenre = useAppSelector(getGenre);

  const updateGenre = (genre: GenreType | undefined) => {
    dispatch(selectGenre(genre));
    dispatch(loadFilms());
  };

  return (
    <ul className="catalog__genres-list">
      {
        allGenres.map((g) => <Genre key={g || 'All Genres'} genre={g || 'All Genres'} isActive={g === selectedGenre} onClick={(genre) => updateGenre(genre)} />)
      }
    </ul>
  );
}

export default GenresList;
