import React, { MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeSort } from '../../store/action';
import { SORT } from '../const/const';

function PlacesOptions():JSX.Element {
  const selectedCity = useAppSelector((state) => state.selectedCity);
  const dispatch = useAppDispatch();

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {SORT.map((type) => (
        <React.Fragment key={type}>
          <li className={`places__option ${selectedCity === type ? 'places__option--active' : ''}`} tabIndex={0}
            onClick={(evt: MouseEvent) => {
              evt.preventDefault();
              dispatch(changeSort(type));
            }}
          >{type}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}

export default PlacesOptions;
