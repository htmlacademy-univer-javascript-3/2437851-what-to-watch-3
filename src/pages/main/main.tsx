import FavoriteList from '../../components/favorite-list/favorite-list';
import FilmsList from '../../components/films/films-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres/genres-list';
import Logo from '../../components/header/logo';
import UserBlock from '../../components/header/user-block';
import Play from '../../components/play/play';
import Poster from '../../components/poster/poster';
import ShowMore from '../../components/show-more/show-more';
import { useAppSelector } from '../../hooks';
import { getDiplayedFilmsCount, getFilms, getIsLoading, getPromoFilm } from '../../store/films-process/selectors';
import Loading from '../loading/loading';

function Main(): JSX.Element {
  const diplayedFilmsCount = useAppSelector(getDiplayedFilmsCount);
  const promoFilm = useAppSelector(getPromoFilm);
  const films = useAppSelector(getFilms);
  const isLoading = useAppSelector(getIsLoading);

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
                <Play film={promoFilm} />
                <FavoriteList film={promoFilm} />
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
