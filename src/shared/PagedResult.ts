export class PagedResult<T> {
  items: T[] = [];
  total = 0;
  page = 1;
  pageSize = 10;
}
