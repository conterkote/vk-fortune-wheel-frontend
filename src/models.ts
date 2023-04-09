export interface IUserDataResponse {
  id:                number;
  bdate:             string;
  bdate_visibility:  number;
  city:              City;
  country:           City;
  timezone:          number;
  photo_200:         string;
  photo_max_orig:    string;
  sex:               number;
  photo_100:         string;
  first_name:        string;
  last_name:         string;
  can_access_closed: boolean;
  is_closed:         boolean;
}

export interface City {
  id:    number;
  title: string;
}
