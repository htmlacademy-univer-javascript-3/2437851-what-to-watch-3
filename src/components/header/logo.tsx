import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { AdditionalClassName } from '../../types/additional-class-name';
import { buildClassName } from '../../helpers/class-name-builder';

type LogoProps = AdditionalClassName;

function Logo({additionalClassName}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link to={AppRoute.Root} className={buildClassName('logo__link', additionalClassName)}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
