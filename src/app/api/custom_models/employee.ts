export interface Employee {
  id: number;
  email: string;
  password: string;
  access: boolean;
  phone: string;
  skype: string;
  name_f: string;
  name_i: string;
  name_o: string;
  birth_date: string;
  employment_date: string;
  dismissal_date: string;
  company_id: number;
  department_id: number;
  position_id: number;
  department_leader: boolean | 1 | 0;
  num: number;
  time_add: string;
  time_edit: string;
}