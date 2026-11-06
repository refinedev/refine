import type { ReactNode } from "react";
import isEqual from "lodash/isEqual";

import type { CrudFilter } from "../../contexts/data/types";

export type EmptyStateReason =
  | "no-data"
  | "no-search-results"
  | "no-filter-results"
  | "unknown";

export type EmptyStateContext = {
  reason: EmptyStateReason;
  filters: CrudFilter[];
  searchFilters: CrudFilter[];
};

export type EmptyStateRenderContext = EmptyStateContext & {
  resetFilters: () => void;
};

export type EmptyStateRenderer =
  | ReactNode
  | ((context: EmptyStateRenderContext) => ReactNode);

export type GetEmptyStateOptions = {
  data: readonly unknown[] | undefined;
  total: number | undefined;
  filters: CrudFilter[];
  searchFilters?: CrudFilter[];
  searchActive?: boolean;
  filterOriginUnknown?: boolean;
  currentPage: number;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  clientFiltered?: boolean;
};

export const getEmptyState = ({
  data,
  total,
  filters,
  searchFilters = [],
  searchActive = false,
  filterOriginUnknown = false,
  currentPage,
  isLoading = false,
  isFetching = false,
  isError = false,
  clientFiltered = false,
}: GetEmptyStateOptions): EmptyStateContext | undefined => {
  if (
    data === undefined ||
    data.length > 0 ||
    isLoading ||
    isFetching ||
    isError
  ) {
    return undefined;
  }

  if (!clientFiltered && currentPage > 1 && (total ?? 0) > 0) {
    return { reason: "unknown", filters, searchFilters };
  }

  if (searchActive && searchFilters.length > 0) {
    const searchOnly =
      filters.length === searchFilters.length &&
      searchFilters.every((searchFilter) =>
        filters.some((filter) => isEqual(filter, searchFilter)),
      );

    return {
      reason: searchOnly ? "no-search-results" : "unknown",
      filters,
      searchFilters,
    };
  }

  if (filterOriginUnknown && filters.length > 0) {
    return { reason: "unknown", filters, searchFilters };
  }

  if (searchActive && filters.length > 0) {
    return { reason: "unknown", filters, searchFilters };
  }

  if (filters.length > 0) {
    return { reason: "no-filter-results", filters, searchFilters };
  }

  return {
    reason: currentPage === 1 && total === 0 ? "no-data" : "unknown",
    filters,
    searchFilters,
  };
};
