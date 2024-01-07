import { useDispatch } from 'react-redux';
import { showMoreFilms } from '../../store/films-process/films-process';

function ShowMoreBlock(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => dispatch(showMoreFilms())}>Show more</button>
    </div>
  );
}

export default ShowMoreBlock;
