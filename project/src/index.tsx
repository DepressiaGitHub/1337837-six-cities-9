import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  PLACES_COUNT: 23,
  IS_AUTHORIZED: true,
  USER_EMAIL: 'Alex.5corners@gmail.com',
  CARD_CLASS: 'cities',
};

ReactDOM.render(
  <React.StrictMode>
    <App
      placesCount = {Setting.PLACES_COUNT}
      isAuthorized = {Setting.IS_AUTHORIZED}
      userEmail = {Setting.USER_EMAIL}
      cardSecondClass = {Setting.CARD_CLASS}
    />
  </React.StrictMode>,
  document.getElementById('root'));
