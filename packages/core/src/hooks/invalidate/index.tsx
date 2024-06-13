import { useCallback } from "react";

import {
  type InvalidateOptions,
  type InvalidateQueryFilters,
  useQueryClient,
} from "@tanstack/react-query";

import { pickDataProvider } from "@definitions";
import { useKeys, useResource } from "@hooks";

import type { BaseKey, IQueryKeys } from "../../contexts/data/types";

export type UseInvalidateProp = {
  resource?: string;
  id?: BaseKey;
  dataProviderName?: string;
  invalidates: Array<keyof IQueryKeys> | false;
  invalidationFilters?: InvalidateQueryFilters;
  invalidationOptions?: InvalidateOptions;
};

export const useInvalidate = (): ((
  props: UseInvalidateProp,
) => Promise<void>) => {
  const { resources } = useResource();
  const queryClient = useQueryClient();
  const { keys, preferLegacyKeys } = useKeys();

  const invalidate = useCallback(
    async ({
      resource,
      dataProviderName,
      invalidates,
      id,
      invalidationFilters = { type: "all", refetchType: "active" },
      invalidationOptions = { cancelRefetch: false },
    }: UseInvalidateProp) => {
      if (invalidates === false) {
        return;
      }
      const dp = pickDataProvider(resource, dataProviderName, resources);

      const queryKey = keys()
        .data(dp)
        .resource(resource ?? "");

      await Promise.all(
        invalidates.map((key) => {
          switch (key) {
            case "all":
              return queryClient.invalidateQueries(
                keys().data(dp).get(preferLegacyKeys),
                invalidationFilters,
                invalidationOptions,
              );
            case "list":
              return queryClient.invalidateQueries(
                queryKey.action("list").get(preferLegacyKeys),
                invalidationFilters,
                invalidationOptions,
              );
            case "many":
              return queryClient.invalidateQueries(
                queryKey.action("many").get(preferLegacyKeys),
                invalidationFilters,
                invalidationOptions,
              );
            case "resourceAll":
              return queryClient.invalidateQueries(
                queryKey.get(preferLegacyKeys),
                invalidationFilters,
                invalidationOptions,
              );
            case "detail":
              return queryClient.invalidateQueries(
                queryKey
                  .action("one")
                  .id(id || "")
                  .get(preferLegacyKeys),
                invalidationFilters,
                invalidationOptions,
              );
            default:
              return;
          }
        }),
      );

      return;
    },
    [],
  );

  return invalidate;
};
