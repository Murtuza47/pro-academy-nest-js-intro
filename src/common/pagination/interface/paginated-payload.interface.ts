export interface IPaginatedPayload<T> {
  data: T[];
  metaData: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  metaLinks: {
    firstPage: string;
    lastPage: string;
    currentPage: string;
    nextPage: string;
    previousPage: string;
  };
}
