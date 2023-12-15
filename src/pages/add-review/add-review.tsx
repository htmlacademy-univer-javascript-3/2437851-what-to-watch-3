import { Link } from 'react-router-dom';
import Logo from '../../components/header/logo';
import UserBlock from '../../components/header/user-block';
import Review from '../../components/review/review';
import { AppRoute } from '../../consts';
import Poster from '../../components/poster/poster';
import { useAppSelector } from '../../hooks';
import NotFound from '../not-found/not-found';
import { getCurrentFilm } from '../../store/films-process/selectors';

function AddReview(): JSX.Element {
  const film = useAppSelector(getCurrentFilm);

  if (!film) {
    return (<NotFound />);
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

        <Poster film={film} additionalClassName='film-card__poster--small' />
      </div>

      <Review />
    </section>
  );
}

export default AddReview;
