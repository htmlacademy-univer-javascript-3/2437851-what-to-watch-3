import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationDetails } from '../../store/user-process/selectors';
import { MouseEvent } from 'react';
import { logout } from '../../store/api-actions';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationDetails = useAppSelector(getAuthorizationDetails);

  const handleLogout = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logout());
  };

  return (authorizationDetails
    ?
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={authorizationDetails.avatarUrl} alt="User avatar" width="63" height="63" onClick={() => navigate(`/${AppRoute.MyList}`)} />
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link" to={AppRoute.Root} onClick={handleLogout}>Sign out</Link>
      </li>
    </ul>
    :
    <div className="user-block">
      <Link className="user-block__link" to={`/${AppRoute.Login}`}>Sign in</Link>
    </div>
  );
}

export default UserBlock;
