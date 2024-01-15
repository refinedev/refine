import { CrudSorting } from "@refinedev/core";
import set from "lodash/set";

export type HasuraSortingType = Record<string, "asc" | "desc">;

export type GenerateSortingType = {
    (sorting?: CrudSorting): HasuraSortingType | undefined;
};

const generateNestedSorting = (sorter) => {
  if (!sorter) {
    return undefined;
  }

  const { field, order } = sorter;
  const fieldsArray = field.split(".");

  return fieldsArray.reduceRight((acc, curr) => ({ [curr]: acc }), order);
};

export const generateSorting: GenerateSortingType = (sorters) => {
  if (!sorters) {
    return undefined;
  }

  return sorters.map(generateNestedSorting);
};
