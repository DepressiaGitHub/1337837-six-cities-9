import React from 'react';

type PropertyGalleryProps = {
  images: string[];
}

function PropertyGallery (props: PropertyGalleryProps):JSX.Element {
  const { images } = props;
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((src) => (
          <React.Fragment key={src}>
            <div className="property__image-wrapper">
              <img className="property__image" src={src} alt="Studio" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PropertyGallery;
