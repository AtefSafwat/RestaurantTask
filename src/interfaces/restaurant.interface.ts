export interface Restaurant {
  _id: string;
  name: string;
  slugName: string;
  ownerId: string;
  cuisine: string;
  location: Location;
}

export interface Location {
  lat: string;
  long: string;
}
