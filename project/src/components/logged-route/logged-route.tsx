import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function LoggedRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus !== AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Main} />
  );
}

export default LoggedRoute;
