import React, { memo, MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeSort } from '../../store/app-data/app-data';
import { SORT } from '../../const';
import { getSelectedType } from '../../store/app-data/selectors';

function PlacesOptions():JSX.Element {
  // const selectedType = useAppSelector(({DATA}) => DATA.selectedType);
  const selectedType = useAppSelector(getSelectedType);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-console
  console.log('PlacesOptions: render');

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {SORT.map((type) => (
        <React.Fragment key={type}>
          <li className={`places__option ${selectedType === type ? 'places__option--active' : ''}`} tabIndex={0}
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

export default memo(PlacesOptions);
