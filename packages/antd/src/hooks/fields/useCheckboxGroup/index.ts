import { QueryObserverResult } from "@tanstack/react-query";
import type { Checkbox } from "antd";

import {
  BaseRecord,
  GetListResponse,
  HttpError,
  UseSelectProps,
  useSelect,
  BaseKey,
  pickNotDeprecated,
  BaseOption,
} from "@refinedev/core";

export type UseCheckboxGroupReturnType<
  TData extends BaseRecord = BaseRecord,
  TOption extends BaseOption = BaseOption,
> = {
  checkboxGroupProps: Omit<
    React.ComponentProps<typeof Checkbox.Group>,
    "options"
  > & {
    options: TOption[];
  };
  queryResult: QueryObserverResult<GetListResponse<TData>>;
};

type UseCheckboxGroupProps<TQueryFnData, TError, TData> = Omit<
  UseSelectProps<TQueryFnData, TError, TData>,
  "defaultValue"
> & {
  /**
   * Sets the default value
   */
  defaultValue?: BaseKey[];
};

/**
 * `useCheckboxGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/checkbox/#components-checkbox-demo-group Checkbox.Group} component when records in a resource needs to be used as checkbox options.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/field/useCheckboxGroup/} for more details
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useCheckboxGroup = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
  TOption extends BaseOption = BaseOption,
>({
  resource,
  sort,
  sorters,
  filters,
  optionLabel,
  optionValue,
  queryOptions,
  fetchSize,
  pagination,
  liveMode,
  defaultValue,
  onLiveEvent,
  liveParams,
  meta,
  metaData,
  dataProviderName,
}: UseCheckboxGroupProps<
  TQueryFnData,
  TError,
  TData
>): UseCheckboxGroupReturnType<TData, TOption> => {
  const { queryResult, options } = useSelect<
    TQueryFnData,
    TError,
    TData,
    TOption
  >({
    resource,
    sort,
    sorters,
    filters,
    optionLabel,
    optionValue,
    queryOptions,
    fetchSize,
    pagination,
    liveMode,
    defaultValue,
    onLiveEvent,
    liveParams,
    meta: pickNotDeprecated(meta, metaData),
    metaData: pickNotDeprecated(meta, metaData),
    dataProviderName,
  });
  return {
    checkboxGroupProps: {
      options,
      defaultValue,
    },
    queryResult,
  };
};
