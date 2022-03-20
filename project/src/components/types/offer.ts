export type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type City = {
  location: Location,
  name: string,
}

export type Offer = {
  id: number,
  placeName: string,
  placeType: string,
  price: number,
  premiumMark: boolean,
  favorite: boolean,
  rating: number,
  previewImage: string,
  city: City,
}
