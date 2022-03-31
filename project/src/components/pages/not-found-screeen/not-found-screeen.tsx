import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import Header from '../../header/header';
import Footer from '../../footer/footer';

function NotFoundScreen ():JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <div className='not-found'>
        <h1 className='not-found__title'>4 0 4</h1>
        <p className='not-found__text'>Page not found</p>
        <Link to={AppRoute.Main} className='not-found__link'>Go to main page</Link>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default NotFoundScreen;
