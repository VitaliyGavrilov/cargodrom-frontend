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
  birth_date: string | Date;
  employment_date: string | Date;
  dismissal_date: string | Date;
  company_id: number;
  department_id: number;
  position_id: number;
  department_leader: boolean;
  num: number;
  time_add: string;
  time_edit: string;
}