import { makeFakeHoverOffer } from '../../utils/mocks';
import { appProcess, hoverOffer } from './app-process';

const hover = makeFakeHoverOffer();

describe('Reducer: process', () => {
  it('без дополнительных параметров должен возвращать исходное состояние', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({offerByHover: null});
  });

  it('должен подставить id-объявления в значение', () => {
    const state = {offerByHover: null};

    expect(appProcess.reducer(state, hoverOffer(hover)))
      .toEqual({offerByHover: hover.offerByHover});
  });
});
