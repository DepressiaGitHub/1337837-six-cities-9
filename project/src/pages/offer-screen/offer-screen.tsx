import Header from '../../components/header/header';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import Map from '../../components/map/map';
import { useParams } from 'react-router-dom';
import { store } from '../../store';
import { fetchDataPropertyAction, fetchDataCommentsAction, fetchDataNearbyAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import React, { useEffect } from 'react';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { requireDataProperty } from '../../store/app-data/app-data';
import { getNearbyOffers, getProperty } from '../../store/app-data/selectors';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyContainer from '../../components/property-container/property-container';

function OfferScreen ():JSX.Element {
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    store.dispatch(fetchDataPropertyAction(id));
    store.dispatch(fetchDataCommentsAction(id));
    store.dispatch(fetchDataNearbyAction(id));

    return () => {
      // Тут надо сбросить флаг, чтобы при заходе на новое объявление не было видно старых данных пока грузятся новые.
      store.dispatch(requireDataProperty());
    };
  }, [id]);

  const property = useAppSelector(getProperty);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  if (property === null || nearbyOffers.length === 0) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property" data-testid="property">
          <PropertyGallery images={property.images} />
          <PropertyContainer offer={property} />
          <section className="property__map map">
            <Map
              city={nearbyOffers[0].city}
              offers={nearbyOffers}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places" data-testid="places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlacesList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
