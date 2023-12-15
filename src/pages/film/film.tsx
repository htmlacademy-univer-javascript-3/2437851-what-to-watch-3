import { Link, useParams } from 'react-router-dom';
import FilmsList from '../../components/films/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/header/logo';
import UserBlock from '../../components/header/user-block';
import { AppRoute, AuthorizationStatus } from '../../consts';
import Poster from '../../components/poster/poster';
import Tabs from '../../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFound from '../not-found/not-found';
import { fetchComments, fetchFilm, fetchSimilarFilms } from '../../store/api-actions';
import { useEffect } from 'react';
import Loading from '../loading/loading';
import { getCurrentFilm, getIsLoading, getSimilarFilms } from '../../store/films-process/selectors';
import { getComments } from '../../store/comments-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import Play from '../../components/play/play';
import FavoriteList from '../../components/favorite-list/favorite-list';

function Film(): JSX.Element {
  const {id} = useParams();
  const isLoading = useAppSelector(getIsLoading);
  const currentFilm = useAppSelector(getCurrentFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const comments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
      dispatch(fetchSimilarFilms(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (<Loading />);
  }

  if (id === undefined || !currentFilm) {
    return (<NotFound />);
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <Play film={currentFilm} />
                <FavoriteList film={currentFilm} />
                {
                  authorizationStatus === AuthorizationStatus.Auth &&
                  <Link to={`${AppRoute.Review}`} className="btn film-card__button">Add review</Link>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <Poster film={currentFilm} additionalClassName='film-card__poster--big' />
            <Tabs film={currentFilm} comments={comments} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Film;
