import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

function NotFound(): JSX.Element {
  return (
    <>
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </>
  );
}

export default NotFound;
