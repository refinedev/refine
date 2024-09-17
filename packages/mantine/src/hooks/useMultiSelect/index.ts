import type { MultiSelectProps } from "@mantine/core";
import type { QueryObserverResult } from "@tanstack/react-query";

import {
  useSelect as useSelectCore,
  type BaseRecord,
  type GetManyResponse,
  type GetListResponse,
  type HttpError,
  type UseSelectProps,
  type BaseOption,
  type Prettify,
} from "@refinedev/core";
import { useCallback } from "react";
import { getOptionValue } from "../../utils";

export type UseMultiSelectReturnType<
  TData extends BaseRecord = BaseRecord,
  TOption extends BaseOption = BaseOption,
> = {
  selectProps: Prettify<
    Omit<MultiSelectProps, "data"> & {
      data: TOption[];
    }
  >;
  query: QueryObserverResult<GetListResponse<TData>>;
  defaultValueQuery: QueryObserverResult<GetManyResponse<TData>>;
};

export const useMultiSelect = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
  TOption extends BaseOption = BaseOption,
>(
  props: UseSelectProps<TQueryFnData, TError, TData>,
): UseMultiSelectReturnType<TData, TOption> => {
  const { optionValue = "id" } = props;
  const getOptionValueCallback = useCallback(
    (item: TData): string => getOptionValue(item, optionValue),
    [optionValue],
  );

  const { query, defaultValueQuery, onSearch, options } = useSelectCore<
    TQueryFnData,
    TError,
    TData,
    TOption
  >({
    ...props,
    optionValue: getOptionValueCallback,
  });

  return {
    selectProps: {
      data: options,
      onSearchChange: onSearch,
      searchable: true,
      clearable: true,
    },
    query,
    defaultValueQuery,
  };
};
