import FilmsList from '../../components/films/films-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres/genres-list';
import Logo from '../../components/header/logo';
import UserBlock from '../../components/header/user-block';
import Poster from '../../components/poster/poster';
import ShowMore from '../../components/show-more/show-more';
import { useAppSelector } from '../../hooks';
import Loading from '../loading/loading';

function Main(): JSX.Element {
  const diplayedFilmsCount = useAppSelector((state) => state.diplayedFilmsCount);
  const promoFilm = useAppSelector((state) => state.promoFilm);
  const films = useAppSelector((state) => state.films);
  const isLoading = useAppSelector((state) => state.isLoading);

  if (isLoading || promoFilm === null) {
    return (<Loading />);
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <Poster film={promoFilm} />

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{films.length}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={films.map((f) => f.genre)} />
          <FilmsList films={films.slice(0, diplayedFilmsCount)} />
          {films.length > diplayedFilmsCount && <ShowMore />}
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Main;
