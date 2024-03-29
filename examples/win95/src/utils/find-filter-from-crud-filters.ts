import { CrudFilters, LogicalFilter } from "@refinedev/core";

export const findFilterFromCrudFilters = (params: {
  field: string;
  filters: CrudFilters;
}) => {
  if (!params.filters) {
    return;
  }
  return params?.filters.find((filter) => {
    if ("field" in filter) {
      return filter.field === params.field;
    }

    findFilterFromCrudFilters({ field: params.field, filters: filter.value });
  });
};
