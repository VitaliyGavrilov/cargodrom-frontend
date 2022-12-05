export interface SortColumn<T> {
  field: keyof T;
  dir: 'asc' | 'desc';
}
