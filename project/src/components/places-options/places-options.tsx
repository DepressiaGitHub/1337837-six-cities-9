import React, { memo, MouseEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeSort } from '../../store/app-data/app-data';
import { SORT } from '../../const';
import { getSelectedType } from '../../store/app-data/selectors';

function PlacesOptions():JSX.Element {
  // const selectedType = useAppSelector(({DATA}) => DATA.selectedType);
  const selectedType = useAppSelector(getSelectedType);
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-console
  console.log('PlacesOptions: render');

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={() => setIsOpened(!isOpened)}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
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
    </form>
  );
}

export default memo(PlacesOptions);
