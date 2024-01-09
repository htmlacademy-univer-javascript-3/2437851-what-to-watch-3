import AddToFavoriteListBlock from '../../components/add-to-favorite-list-block/add-to-favorite-list-block';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import PlayFilm from '../../components/play-film/play-film';
import Poster from '../../components/poster/poster';
import ShowMoreBlock from '../../components/show-more-block/show-more-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDiplayedFilmsCount, getFilms, getIsLoading, getPromoFilm } from '../../store/films-process/selectors';
import Loading from '../loading-screen/loading-screen';
import { useEffect } from 'react';
import { ALL_FILMS_GENRE } from '../../consts';
import { loadFilms, selectGenre } from '../../store/films-process/films-process';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectGenre(ALL_FILMS_GENRE));
    dispatch(loadFilms());
  }, [dispatch]);

  const diplayedFilmsCount = useAppSelector(getDiplayedFilmsCount);
  const promoFilm = useAppSelector(getPromoFilm);
  const films = useAppSelector(getFilms);
  const isLoading = useAppSelector(getIsLoading);

  if (isLoading || !promoFilm) {
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
                <PlayFilm film={promoFilm} />
                <AddToFavoriteListBlock film={promoFilm} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <FilmsList films={films.slice(0, diplayedFilmsCount)} />
          {films.length > diplayedFilmsCount && <ShowMoreBlock />}
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
