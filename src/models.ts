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

export type IUserData = Pick<IUserDataResponse, 'id' | 'photo_200' | 'first_name'>

export interface IUserState {
  userData ?: IUserData
  balance : number
}

export interface City {
  id:    number;
  title: string;
}

export interface IAuthorizeResponse {
  id:         string;
  first_name: string;
  photo_200:  string;
  balance:    number;
}

export type IBalanceResponse = IAuthorizeResponse;

export interface IJackpotResponse {
  jackpot : number
}

export interface ISpinResponse {
  amount : string
  id:           number;
  photo_200:    string;
  first_name:   string;
  balance:      number;
  jackpot:      number;
  prizeDegrees: IPrizeDegrees;
}

export interface IPrizeDegrees {
  sectionStartsAt: number;
  sectionEndsAt:   number;
}

export interface IStupidAxiosResponse {
  data : ISpinResponse
}

export interface IWinner {
  
}

