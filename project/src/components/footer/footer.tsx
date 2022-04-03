import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Footer ():JSX.Element {
  // eslint-disable-next-line no-console
  console.log('Footer: render');

  return (
    <footer className="footer container">
      <Link to={AppRoute.Main} className="footer__logo-link">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
}

export default memo(Footer);
