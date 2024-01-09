import { useState } from 'react';
import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[];
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  const [, setActiveFilmId] = useState<string | null>(null);

  return (
    <div className="catalog__films-list">
      {
        films.map((f) => <FilmCard key={f.id} film={f} onMouseEnter={setActiveFilmId} onMouseLeave={() => setActiveFilmId(null)} />)
      }
    </div>
  );
}

export default FilmsList;
