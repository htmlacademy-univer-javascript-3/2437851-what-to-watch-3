import Genre from './genre';
import { useDispatch } from 'react-redux';
import { loadFilms, selectGenre } from '../../store/action';
import { Genre as GenreType } from '../../types/genre';
import { useAppSelector } from '../../hooks';

type GenresListProps = {
  genres: GenreType[];
}

function GenresList({genres}: GenresListProps): JSX.Element {
  const allGenres = [...new Set(genres)] as [GenreType | undefined];
  allGenres.unshift(undefined);

  const dispatch = useDispatch();
  const selectedGenre = useAppSelector((state) => state.genre);

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
