// table.models.ts
export interface TableColumn {
  field: string;
  title: string;
  width?: string;
}

export interface Customer {
  id: number;
  name: string;
  name_full: string;
  inn: number;
  country_name: string;
  city_name: string;
  contact_fio: string;
  phone: string;
  interaction_name: string;
  status_name: string;
  manager_name: string;
  manager_sale_name: string;
  // ... другие поля по необходимости
}

export interface CustomerResponse {
  total: number;
  items: Customer[];
}

export interface CustomerTableSchema {
  table: Array<{
    column: string;
    items: TableColumn[];
  }>;
}