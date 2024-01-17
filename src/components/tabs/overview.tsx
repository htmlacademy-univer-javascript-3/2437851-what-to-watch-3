import { FilmDetails } from '../../types/film';

type OverviewProps = {
  film: FilmDetails;
}

function getRatingLevel(rating: number): string {
  if (rating < 3) {
    return 'Bad';
  } else if (rating < 5) {
    return 'Normal';
  } else if (rating < 8) {
    return 'Good';
  } else if (rating < 9) {
    return 'Very good';
  } else {
    return 'Awesome';
  }
}

function Overview({film}: OverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating.toFixed(1)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(film.rating)}</span>
          <span className="film-rating__count">{`${film.scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>{`Director: ${film.director}`}</strong></p>

        <p className="film-card__starring"><strong>{`Starring: ${film.starring.join(', ')}`}</strong></p>
      </div>
    </>
  );
}

export default Overview;
