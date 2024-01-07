import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getAuthorizationDetails } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationDetails = useAppSelector(getAuthorizationDetails);

  return (
    authorizationDetails
      ? children
      : <Navigate to={`/${AppRoute.Login}`} />
  );
}

export default PrivateRoute;
