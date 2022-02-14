import MainPageScreen from '../main-page-screen/main-page-screen';

type AppScreenProps = {
  isAuthorized: boolean;
  userEmail: string;
  placesCount: number;
  cardSecondClass: string,
}

function App({isAuthorized, userEmail, placesCount, cardSecondClass}: AppScreenProps): JSX.Element {
  return (
    <MainPageScreen
      isAuthorized={isAuthorized}
      userEmail={userEmail}
      placesCount={placesCount}
      cardSecondClass={cardSecondClass}
    />
  );
}

export default App;
