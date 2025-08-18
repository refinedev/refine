import type { Pagination } from "../../../contexts/data/types";

type HandlePaginationParamsProps = {
  pagination?: Pagination;
};

export const handlePaginationParams = ({
  pagination,
}: HandlePaginationParamsProps = {}): Required<Pagination> => {
  const mode = pagination?.mode ?? "server";

  const current = pagination?.current ?? 1;

  const pageSize = pagination?.pageSize ?? 10;

  return {
    current,
    pageSize,
    mode,
  };
};
