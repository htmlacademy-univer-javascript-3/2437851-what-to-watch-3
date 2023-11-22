import { useDispatch } from 'react-redux';
import { showMoreFilms } from '../../store/action';

function ShowMore(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => dispatch(showMoreFilms())}>Show more</button>
    </div>
  );
}

export default ShowMore;
