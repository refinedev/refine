import type { CrudFilters } from "@refinedev/core";
import { generateFilter } from "./generateFilter";
import { replaceIdWithAppwriteId } from "./replaceIdWithAppwriteId";

type GetAppwriteFiltersType = (filters?: CrudFilters) => string[];

export const getAppwriteFilters: GetAppwriteFiltersType = (filters) => {
  const appwriteFilters: string[] = [];

  for (const filter of filters ?? []) {
    appwriteFilters.push(generateFilter(replaceIdWithAppwriteId(filter)));
  }

  return appwriteFilters;
};
