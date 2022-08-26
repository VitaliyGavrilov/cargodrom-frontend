import { Contact } from "./contact";

export interface Contractor {
  id?: number;
  name?: string;
  ind?: string | number;
  name_f?: string,
  name_i?: string,
  name_o?: string,
  email?: string;
  user_id?: number;
  owner_id?: number;
  company_name?: string;
  country_name?: string;
  country_id?: number;
  city_name?: string;
  city_id?: number;
  address?: string;
  phone?: string;
  web?: string;
  language_name?: string;
  language_id?: string;
  type_name?: string | null;
  type_id?: number;
  association_name?: string;
  association_id?: any[];
  tax_name?: string;
  tax_id?: number;
  rating_nps_text?: string;
  rating_nps?: number;
  user_rating_nps_text?: string;
  user_rating_nps?: number;
  review_count?: number;
  review_positive_count?: number;
  review_negative_count?: number;
  review_neutral_count?: number;
  order_count?: number;
  trade_percent?: number;
  trade_count?: number;
  trade_success_count?: number;
  trade_fail_count?: number;
  contact_count?: number;
  contacts?: Partial<Contact>[];
  contact_name?: string;
  contact_info?: string;
  time_add?: string;
  time_edit?: string;
  avg_answer_time?: number;
  access?: number;
  request_format_id?: string;
  exclude_from_trade?: boolean;
  types?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_city?: string;
  cargo?: string;
}

export interface ContractorType {
  id?: string;
  name?: string;
}

export interface ContractorRequestFormat {
  id: string;
  name: string;
}
