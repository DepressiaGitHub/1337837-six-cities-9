import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isAuth } from '../../util';
import React, { memo } from 'react';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getUserData } from '../../store/app-data/selectors';

type HeaderProps = {
  logo?: boolean,
}

function Header (props: HeaderProps):JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {props.logo ? (
              <span className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </span>
            ) : (
              <Link to={AppRoute.Main} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            )}
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth(authorizationStatus) ? (
                <React.Fragment>
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img className="header__avatar" src={user?.avatarUrl} alt="user avatar" width="20" height="20" />
                      </div>
                      <span className="header__user-name user__name">{user?.email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      to={AppRoute.Main}
                      className="header__nav-link"
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </React.Fragment>
              ) : (
                <li className="header__nav-item user">
                  <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
