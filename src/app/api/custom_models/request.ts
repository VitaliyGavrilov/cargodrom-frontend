//вид запроса
export interface RequestFormat {
  id: string;
  name: string;
}
//список запросов
export interface RequestList {
  total: number,
  items: Request[],
  column: [
    string
  ],
  sort: [
    string
  ]
}

export interface Incoterms {
  id: 0,
  name: "string",
  services_id: [string]
}

export interface RequestServices {
  id: string;
  name: string;
}


//запрос
export interface Request {
  id: number,
  customer_id: number,
  customer: string,
  request_type_id: number,
  transport_kind_id: string,
  transport_type_id: number,
  cargo_description: string,
  cargo_type_id: number,
  cargo_package_id: number,
  cargo_temp_control: string,
  cargo_danger: true,
  cargo_danger_file: {},
  cargo_places: [
    {
      num: number,
      cargo_package_id: number,
      stacking: true,
      length: number,
      width: number,
      height: number,
      weight: number,
      count: number
    }
  ],
  cargo_places_count: number,
  cargo_places_weight: number,
  cargo_places_volume: number,
  cargo_places_paid_weight: number,
  cargo_places_density: number,
  cargo_cost: number,
  cargo_currency_id: string,
  cargo_file: {},
  departure_city_id: number,
  departure_country_id: number,
  departure_point_id: number,
  departure_address: string,
  arrival_city_id: number,
  arrival_country_id: number,
  arrival_point_id: number,
  arrival_address: string,
  departure_flight: any,
  incoterms_id: number,
  services: [
    string
  ],
  services_optional: [
    string
  ],
  comment: string,
  status_id: number,
  status_crm_id: number,
  manager_initiator_id: number,
  manager_initiator_name: string,
  manager_creator_id: number,
  manager_creator_name: string,
  manager_executor_id: number,
  manager_executor_name: string
}







