export type User = {
  imgPath: string,
  name: string,
  status?: string,
}

export type Review = {
  id: string,
  user: User,
  rating: number,
  comment: string,
  date: string,
}
