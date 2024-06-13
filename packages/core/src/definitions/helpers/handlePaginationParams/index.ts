import type { Pagination } from "../../../contexts/data/types";
import { pickNotDeprecated } from "../pickNotDeprecated";

type HandlePaginationParamsProps = {
  hasPagination?: boolean;
  pagination?: Pagination;
  configPagination?: Pagination;
};

export const handlePaginationParams = ({
  hasPagination,
  pagination,
  configPagination,
}: HandlePaginationParamsProps = {}): Required<Pagination> => {
  const hasPaginationString = hasPagination === false ? "off" : "server";
  const mode = pagination?.mode ?? hasPaginationString;

  const current =
    pickNotDeprecated(pagination?.current, configPagination?.current) ?? 1;

  const pageSize =
    pickNotDeprecated(pagination?.pageSize, configPagination?.pageSize) ?? 10;

  return {
    current,
    pageSize,
    mode,
  };
};
