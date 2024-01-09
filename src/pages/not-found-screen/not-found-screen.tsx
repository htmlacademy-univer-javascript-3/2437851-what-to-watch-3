import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </>
  );
}

export default NotFoundScreen;
