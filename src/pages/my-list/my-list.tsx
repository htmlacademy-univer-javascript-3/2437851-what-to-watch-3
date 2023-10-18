import FilmsList from '../../components/films/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/header/logo';
import UserBlock from '../../components/header/user-block';
import { myListFilms } from '../../data';

function MyList(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList cards={myListFilms} />
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
