import Logo from '../header/logo';

function Footer(): JSX.Element {
  return (
    <footer className="page-footer">
      <Logo additionalClassName="logo__link--light" />
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
