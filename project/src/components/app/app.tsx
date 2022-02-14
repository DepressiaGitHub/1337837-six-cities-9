import MainPageScreen from '../main-page-screen/main-page-screen';

type AppScreenProps = {
  userEmail: string;
  placesCount: number;
  cardSecondClass: string,
}

function App({userEmail, placesCount, cardSecondClass}: AppScreenProps): JSX.Element {
  return (
    <MainPageScreen
      userEmail={userEmail}
      placesCount={placesCount}
      cardSecondClass={cardSecondClass}
    />
  );
}

export default App;
