export type PagerProps = {
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
