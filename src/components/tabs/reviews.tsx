import { Comment } from '../../types/comment';

const DATE_FORMATTING_OPTIONS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

type ReviewsProps = {
  comments: Comment[];
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-us', DATE_FORMATTING_OPTIONS);
}

function Reviews({comments}: ReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          comments.map((r) => (
            <div className="review" key={r.id}>
              <blockquote className="review__quote">
                <p className="review__text">{r.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{r.user}</cite>
                  <time className="review__date" dateTime={r.date}>{formatDate(r.date)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{r.rating}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Reviews;
