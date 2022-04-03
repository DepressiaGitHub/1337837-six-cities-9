import React, { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/app-data/app-data';
import { CITIES } from '../../const';
import { getActiveCity } from '../../store/app-data/selectors';

function LocationsList():JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();

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

export default memo(LocationsList);
