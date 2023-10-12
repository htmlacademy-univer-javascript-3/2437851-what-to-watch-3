function getInclusiveRange(start: number, end: number): number[] {
  return Array.from({length: end - start}, (_, key) => start + key);
}

function Rating(): JSX.Element {
  const createRatingStar = (n: number): JSX.Element => (
    <>
      <input className="rating__input" id={`star-${n}`} type="radio" name="rating" value={n} />
      <label className="rating__label" htmlFor={`star-${n}`}>{`Rating ${n}`}</label>
    </>
  );

  return (
    <div className="rating">
      <div className="rating__stars">
        {
          getInclusiveRange(1, 10)
            .reverse()
            .map((n) => createRatingStar(n))
        }
      </div>
    </div>
  );
}

export default Rating;
