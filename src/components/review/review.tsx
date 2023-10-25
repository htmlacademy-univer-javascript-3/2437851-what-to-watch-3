import { useState } from 'react';
import Rating from './rating';

function Review(): JSX.Element {
  const [review, setReview] = useState<string>('');

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <Rating />

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={review} onChange={(e) => setReview(e.target.value)}/>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Review;
