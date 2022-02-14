import MainPageScreen from '../main-page-screen/main-page-screen';

type AppScreenProps = {
  isAuthorized: boolean;
  userEmail: string;
  placesCount: number;
}

function App({isAuthorized, userEmail, placesCount}: AppScreenProps): JSX.Element {
  return (
    <MainPageScreen isAuthorized={isAuthorized} userEmail={userEmail} placesCount={placesCount} />
  );
}

export default App;
