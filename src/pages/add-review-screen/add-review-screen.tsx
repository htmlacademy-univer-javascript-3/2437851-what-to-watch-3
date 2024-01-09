import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Review from '../../components/review/review';
import { AppRoute } from '../../consts';
import Poster from '../../components/poster/poster';
import { useAppSelector } from '../../hooks';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getCurrentFilm } from '../../store/films-process/selectors';

function AddReviewScreen(): JSX.Element {
  const film = useAppSelector(getCurrentFilm);

  if (!film) {
    return (<NotFoundScreen />);
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <Poster film={film} sizeModifier='small' />
      </div>

      <Review />
    </section>
  );
}

export default AddReviewScreen;
