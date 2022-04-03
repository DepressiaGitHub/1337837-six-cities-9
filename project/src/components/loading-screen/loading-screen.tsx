function LoadingScreen(): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('LoadingScreen: render');

  return (
    <div className="preloader">
      <p className="preloader__text">Loading ...</p>
      <div className="preloader__ring"/>
    </div>
  );
}

export default LoadingScreen;
