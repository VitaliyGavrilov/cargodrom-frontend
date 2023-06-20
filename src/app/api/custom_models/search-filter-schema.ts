export interface SearchFilterSchema {
  header?:     FilterControl[];
  main?:       FilterControl[];
  additional?: FilterControl[];
}

export interface FilterControl {
  form:  'autocomplete' | 'text' | 'checkbox' | 'checkbox_reset' | 'select' | 'period';
  field: string;
  name:  string;
}

export interface FilterSelectControl extends FilterControl {
  form: 'select';
  array: {
    id: number | '' | boolean;
    name: string;
  }[];
}

export interface FilterTextControl extends FilterControl {
  form: 'text';
}

export interface FilterAutocompleteControl extends FilterControl {
  form: 'autocomplete';
}

export interface FilterCheckboxControl extends FilterControl {
  form: 'checkbox' | 'checkbox_reset';
  array: {
    id: string;
    name: string;
  }[];
}

export interface FilterPeriodControl extends FilterControl {
  form: 'period';
}
