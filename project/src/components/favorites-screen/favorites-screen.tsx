import Header from '../header/header';
import Footer from '../footer/footer';
import PlaceCard from '../place-card/place-card';

type FavoritesScreenProps = {
  isAuthorized: boolean;
  userEmail: string;
  cardSecondClass: string,
}

function FavoritesScreen ({isAuthorized, userEmail, cardSecondClass}: FavoritesScreenProps):JSX.Element {
  return (

    <div className="page">
      <Header isAuthorized={isAuthorized} userEmail={userEmail} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <PlaceCard
                    secondClass={cardSecondClass}
                  />
                  <PlaceCard
                    secondClass={cardSecondClass}
                  />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <PlaceCard
                    secondClass={cardSecondClass}
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
