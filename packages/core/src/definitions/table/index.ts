import differenceWith from "lodash/differenceWith";
import unionWith from "lodash/unionWith";
import qs, { type IStringifyOptions } from "qs";
import warnOnce from "warn-once";

import { pickNotDeprecated } from "@definitions/helpers";

import type {
  CrudFilter,
  CrudOperators,
  CrudSort,
  SortOrder,
} from "../../contexts/data/types";

export const parseTableParams = (url: string) => {
  const { current, pageSize, sorter, sorters, filters } = qs.parse(
    url.substring(1), // remove first ? character
  );

  return {
    parsedCurrent: current && Number(current),
    parsedPageSize: pageSize && Number(pageSize),
    parsedSorter: (pickNotDeprecated(sorters, sorter) as CrudSort[]) ?? [],
    parsedFilters: (filters as CrudFilter[]) ?? [],
  };
};

export const parseTableParamsFromQuery = (params: any) => {
  const url = qs.stringify(params);
  return parseTableParams(`/${url}`);
};

/**
 * @internal This function is used to stringify table params from the useTable hook.
 */
export const stringifyTableParams = (params: {
  pagination?: { current?: number; pageSize?: number };
  sorters: CrudSort[];
  filters: CrudFilter[];
  [key: string]: any;
}): string => {
  const options: IStringifyOptions = {
    skipNulls: true,
    arrayFormat: "indices",
    encode: false,
  };
  const { pagination, sorter, sorters, filters, ...rest } = params;

  const queryString = qs.stringify(
    {
      ...rest,
      ...(pagination ? pagination : {}),
      sorters: pickNotDeprecated(sorters, sorter),
      filters,
    },
    options,
  );

  return queryString;
};

export const compareFilters = (
  left: CrudFilter,
  right: CrudFilter,
): boolean => {
  if (
    left.operator !== "and" &&
    left.operator !== "or" &&
    right.operator !== "and" &&
    right.operator !== "or"
  ) {
    return (
      ("field" in left ? left.field : undefined) ===
        ("field" in right ? right.field : undefined) &&
      left.operator === right.operator
    );
  }

  return (
    ("key" in left ? left.key : undefined) ===
      ("key" in right ? right.key : undefined) &&
    left.operator === right.operator
  );
};

export const compareSorters = (left: CrudSort, right: CrudSort): boolean =>
  left.field === right.field;
// Keep only one CrudFilter per type according to compareFilters
// Items in the array that is passed first to unionWith have higher priority
// CrudFilter items with undefined values are necessary to signify no filter
// After union, don't keep CrudFilter items with undefined value in the result
// Items in the arrays with higher priority are put at the end.
export const unionFilters = (
  permanentFilter: CrudFilter[],
  newFilters: CrudFilter[],
  prevFilters: CrudFilter[] = [],
): CrudFilter[] => {
  const isKeyRequired = newFilters.filter(
    (f) => (f.operator === "or" || f.operator === "and") && !f.key,
  );

  if (isKeyRequired.length > 1) {
    warnOnce(
      true,
      "[conditionalFilters]: You have created multiple Conditional Filters at the top level, this requires the key parameter. \nFor more information, see https://refine.dev/docs/advanced-tutorials/data-provider/handling-filters/#top-level-multiple-conditional-filters-usage",
    );
  }

  return unionWith(
    permanentFilter,
    newFilters,
    prevFilters,
    compareFilters,
  ).filter(
    (crudFilter) =>
      crudFilter.value !== undefined &&
      crudFilter.value !== null &&
      (crudFilter.operator !== "or" ||
        (crudFilter.operator === "or" && crudFilter.value.length !== 0)) &&
      (crudFilter.operator !== "and" ||
        (crudFilter.operator === "and" && crudFilter.value.length !== 0)),
  );
};

export const unionSorters = (
  permanentSorter: CrudSort[],
  newSorters: CrudSort[],
): CrudSort[] =>
  unionWith(permanentSorter, newSorters, compareSorters).filter(
    (crudSorter) => crudSorter.order !== undefined && crudSorter.order !== null,
  );
// Prioritize filters in the permanentFilter and put it at the end of result array
export const setInitialFilters = (
  permanentFilter: CrudFilter[],
  defaultFilter: CrudFilter[],
): CrudFilter[] => [
  ...differenceWith(defaultFilter, permanentFilter, compareFilters),
  ...permanentFilter,
];

export const setInitialSorters = (
  permanentSorter: CrudSort[],
  defaultSorter: CrudSort[],
): CrudSort[] => [
  ...differenceWith(defaultSorter, permanentSorter, compareSorters),
  ...permanentSorter,
];

export const getDefaultSortOrder = (
  columnName: string,
  sorter?: CrudSort[],
): SortOrder | undefined => {
  if (!sorter) {
    return undefined;
  }

  const sortItem = sorter.find((item) => item.field === columnName);

  if (sortItem) {
    return sortItem.order as SortOrder;
  }

  return undefined;
};

export const getDefaultFilter = (
  columnName: string,
  filters?: CrudFilter[],
  operatorType: CrudOperators = "eq",
): CrudFilter["value"] | undefined => {
  const filter = filters?.find((filter) => {
    if (
      filter.operator !== "or" &&
      filter.operator !== "and" &&
      "field" in filter
    ) {
      const { operator, field } = filter;
      return field === columnName && operator === operatorType;
    }
    return undefined;
  });

  if (filter) {
    return filter.value || [];
  }

  return undefined;
};
