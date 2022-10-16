export type SortOrder = 'asc' | 'desc';
export type SortType = 'numeric' | 'case-sensitive' | 'case-insensitive';

export const byName = (order: SortOrder) => (a: { name: string }, b: { name: string }) => {
  const aName = a.name.toLocaleLowerCase();
  const bName = b.name.toLocaleLowerCase();
  const result = aName.localeCompare(bName);
  return order === 'asc' ? result : -result;
}

export const byField = <T>(field: keyof T, order: SortOrder, type: SortType) => (a: T, b: T) => {
  let result = 0;
  if (type === 'numeric') {
    const aField = a[field] as unknown as number;
    const bField = b[field] as unknown as number;
    result = aField - bField;
  } else if (type === 'case-insensitive') {
    const aField = (a[field] as unknown as string).toLocaleLowerCase();
    const bField = (b[field] as unknown as string).toLocaleLowerCase();
    result = aField.localeCompare(bField);
  } else if (type === 'case-sensitive') {
    const aField = (a[field] as unknown as string);
    const bField = (b[field] as unknown as string);
    result = aField.localeCompare(bField);
  }
  return order === 'asc' ? result : -result;
}
