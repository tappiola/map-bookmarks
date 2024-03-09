export interface UserLocation {
  shortName?: string;
  longName?: string;
  locality?: string;
  postcode?: string;
  neighborhood?: string;
  place?: string;
  district?: string;
  region?: string;
  country?: string;
  latitude: number;
  longitude: number;
  placeType?: string;
  name?: string;
}

export interface SavedLocation extends UserLocation {
  id: string;
  placeType: string;
}
