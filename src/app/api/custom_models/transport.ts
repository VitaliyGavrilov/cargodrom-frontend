export const TransportSubKinds = ['avia_lcl', 'avia_fcl', 'road_lcl', 'road_fcl', 'road_adr', 'road_ref', 'sea_teus', 'sea_lcl', 'sea_sp', 'rw_teus', 'rw_lcl', 'rw_sp'] as const;
export type TransportSubKind = typeof TransportSubKinds[number];

//Вид перевозки
export interface TransportKind {
  id: number;
  key:string;
  name: string;
}
//Тип транспорта
export interface TransportType {
  id: number;
  name: string;
}

//Перевозчик
export interface TransportCarrier {
  id?: number;
  kind_id?: number;
  name?: string;
  iata?: string;
}

export interface TransportRoute {
  id?: number,
  kind_id?: number,
  carrier_id?: number,
  country_id_departure?: number,
  country_id_arrival?: number,
  city_id_departure?: number,
  city_id_arrival?: number,
  point_id_departure?: number,
  point_id_arrival?: number,
  name?: string,
}

