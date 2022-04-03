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
  title: string,
  type: string,
  price: number,
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  previewImage: string,
  city: City,
  location: Location,
}
