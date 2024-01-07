import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import cn from 'classnames';

type LogoProps = {
  lightLogo?: boolean;
}

function Logo({lightLogo: lightLogo = false}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link to={AppRoute.Root} className={cn('logo__link', {'logo__link--light': lightLogo})}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
