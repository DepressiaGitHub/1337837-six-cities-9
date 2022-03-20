function LoadingScreen(): JSX.Element {
  return (
    <div className="preloader">
      <p className="preloader__text">Loading ...</p>
      <div className="preloader__ring"/>
    </div>
  );
}

export default LoadingScreen;
