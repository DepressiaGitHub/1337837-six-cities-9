import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-route/history-route';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeCommentList, makeFakeOffer } from '../../utils/mocks';
import PropertyContainer from './property-container';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Data]: {
    property: mockOffer,
    comments: makeFakeCommentList(),
  },
});

describe('Component: PlacesOptions', () => {
  it('должен отрисоваться "PlacesOptions"', () => {
    history.push(`/offer/${mockOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyContainer offer={mockOffer}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('property-container')).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.type}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${mockOffer.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.host.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.description}`)).toBeInTheDocument();
  });
});
