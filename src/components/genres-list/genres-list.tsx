import GenreItem from '../genre-item/genre-item';
import { useDispatch } from 'react-redux';
import { Genre } from '../../types/genre';
import { useAppSelector } from '../../hooks';
import { getAllGenres, getGenre } from '../../store/films-process/selectors';
import { loadFilms, selectGenre } from '../../store/films-process/films-process';

function GenresList(): JSX.Element {
  const dispatch = useDispatch();
  const allGenres = useAppSelector(getAllGenres);
  const selectedGenre = useAppSelector(getGenre);

  const updateGenre = (genre: Genre) => {
    dispatch(selectGenre(genre));
    dispatch(loadFilms());
  };

  return (
    <ul className="catalog__genres-list">
      {
        allGenres.map((g) => <GenreItem key={g} genre={g} isActive={g === selectedGenre} onClick={updateGenre} />)
      }
    </ul>
  );
}

export default GenresList;
