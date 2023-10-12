import FilmCard from './filmCard';

type FilmCardDecoration = {
  title: string;
  posterPath: string;
}

type FilmCardDecorations = {
  cards: FilmCardDecoration[];
}

function FilmsList({cards}: FilmCardDecorations): JSX.Element {
  return (
    <div className="catalog__films-list">
      {
        cards.map((f) => <FilmCard key={f.title} title={f.title} posterPath={f.posterPath} />)
      }
    </div>
  );
}

export default FilmsList;
