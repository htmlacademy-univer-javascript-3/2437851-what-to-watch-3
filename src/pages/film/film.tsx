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

function Film(): JSX.Element {
  const {id} = useParams();
  const isLoading = useAppSelector((state) => state.isLoading);
  const currentFilm = useAppSelector((state) => state.currentFilm);
  const similarFilms = useAppSelector((state) => state.similarFilms);
  const favoriteFilms = useAppSelector((state) => state.favoriteFilms);
  const comments = useAppSelector((state) => state.comments);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
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

  if (!currentFilm) {
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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{favoriteFilms.length}</span>
                </button>
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
