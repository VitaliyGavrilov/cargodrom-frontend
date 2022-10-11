export const byName = (order: 'asc' | 'desc') => (a: {name: string}, b: {name: string}) => {
  const aName = a.name.toLocaleLowerCase();
  const bName = b.name.toLocaleLowerCase();
  const result = aName.localeCompare(bName);
  return order === 'asc' ? result : -result;
}
