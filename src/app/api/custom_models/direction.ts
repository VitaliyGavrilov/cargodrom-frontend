export interface DirectionFlight {
  id: number;
  key: string;
  name: string;
}

export interface DirectionPoint {
  id: number;
  name: string;
  city_id:number;
  country_id:number;
  type_id: number;
  time_add: string;
  time_edit: string;
}
