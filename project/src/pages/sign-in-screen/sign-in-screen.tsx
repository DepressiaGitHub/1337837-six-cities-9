
import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/app-data/app-data';
import { getRandomCity } from '../../util';
import Login from '../../components/login/login';

function SignInScreen ():JSX.Element {

  const dispatch = useAppDispatch();

  const randomCity = getRandomCity(CITIES);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <Login />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={AppRoute.Main}
                className="locations__item-link"
                onClick={() => dispatch(changeCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignInScreen;
