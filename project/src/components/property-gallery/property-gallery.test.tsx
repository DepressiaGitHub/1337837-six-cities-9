import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import PropertyGallery from './property-gallery';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    property: mockOffer,
  },
});

describe('Component: PropertyGallery', () => {
  it('должен отрисоваться "PropertyGallery"', () => {
    history.push(`/offer/${mockOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyGallery images={mockOffer.images}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('property-gallery')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });
});
