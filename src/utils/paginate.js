export function paginate(list, page, itemsPerPage) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return list.slice(startIndex, endIndex);
}
