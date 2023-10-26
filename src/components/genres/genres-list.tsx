import { useState } from 'react';
import Genre from './genre';

type GenresListProps = {
  genres: string[];
}

function GenresList({genres}: GenresListProps): JSX.Element {
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((g) => <Genre key={g} genre={g} isActive={g === selectedGenre} onClick={(genre) => setSelectedGenre(genre)} />)
      }
    </ul>
  );
}

export default GenresList;
