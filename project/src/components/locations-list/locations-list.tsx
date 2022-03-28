import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';
import { CITIES } from '../const/const';

function LocationsList():JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-console
  console.log('LocationsList: render');

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <React.Fragment key={city}>
          <li className="locations__item">
            <Link to={city} className={`locations__item-link tabs__item ${activeCity === city ? 'tabs__item--active' : ''}`}
              onClick={(evt: MouseEvent) => {
                evt.preventDefault();
                dispatch(changeCity(city));
              }}
            >
              <span>{city}</span>
            </Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}

export default LocationsList;
