import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { postReview } from '../../store/api-actions';
import { getInclusiveRange } from '../../utils/utils';
import { getCurrentFilm } from '../../store/films-process/selectors';

function Review(): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const dispatch = useAppDispatch();
  const film = useAppSelector(getCurrentFilm);

  if (film === undefined) {
    return (<NotFoundScreen />);
  }

  const canSubmitReview = rating > 0 && comment.length >= 50 && comment.length <= 400;

  const createRatingStar = (n: number): JSX.Element => (
    <>
      <input className="rating__input" id={`star-${n}`} type="radio" name="rating" value={n} onClick={() => setRating(n)} />
      <label className="rating__label" htmlFor={`star-${n}`}>{`Rating ${n}`}</label>
    </>
  );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmittingReview(true);
    dispatch(postReview({comment: comment, filmId: film.id, rating}));
    setIsSubmittingReview(false);
  };

  return (
    <div className="add-review">
      <form action="" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {
              getInclusiveRange(1, 10)
                .reverse()
                .map((n) => createRatingStar(n))
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" disabled={isSubmittingReview} value={comment} onChange={(e) => setComment(e.target.value)}/>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isSubmittingReview || !canSubmitReview}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Review;
