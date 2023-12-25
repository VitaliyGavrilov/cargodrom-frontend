export interface City {
  id: number;
  name: string;
  time_add?: string;
  time_edit?: string;
}

export interface DirectionCity {
  id: number;
  name: string | undefined;
  country_id: number,
  country_name: string,
  time_add?: string;
  time_edit?: string;
}
