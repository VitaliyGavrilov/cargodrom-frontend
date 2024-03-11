import { TransportSubKind } from './transport';
export interface Contact {
  id: number;
  owner_id: number;
  user_id: number;
  contractor_id: number;
  name_f: string;
  name_i: string;
  name_o: string;
  name: string;
  position: string;
  city_id: number;
  phone: string;
  mobile_phone: string;
  email: string;
  skype: string;
  telegram: string;
  whatsapp: string;
  wechat: string;
  responsible_direction: string[];
  // responsible_param: AllResponsibilities;
  time_add: string;
  time_edit: string;
  city_name: string;

  direction:AreaOfResponsibility[];
}

export interface AreaOfResponsibility {
  direction_departure?: number | string
  direction_arrival?: number | string
  direction_items?:TransportSubKind[]
}
//Старые типы для зоны ответственности контактов
export const responsibilityDirections = ['export', 'import', 'local'] as const;
export type ResponsibilityDirection = typeof responsibilityDirections[number];

export type Responsibilities = { [toCountryId: string]: TransportSubKind[] }
export interface AllResponsibilities {
  import: Responsibilities;
  export: Responsibilities;
  local: TransportSubKind[];
}

