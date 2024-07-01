import type { QueryObserverResult } from "@tanstack/react-query";
import type { Radio } from "antd";

import {
  type BaseKey,
  type BaseOption,
  type BaseRecord,
  type GetListResponse,
  type HttpError,
  pickNotDeprecated,
  useSelect,
  type UseSelectProps,
} from "@refinedev/core";

export type UseRadioGroupReturnType<
  TData extends BaseRecord = BaseRecord,
  TOption extends BaseOption = BaseOption,
> = {
  radioGroupProps: Omit<React.ComponentProps<typeof Radio.Group>, "options"> & {
    options: TOption[];
  };
  queryResult: QueryObserverResult<GetListResponse<TData>>;
};

type UseRadioGroupProps<TQueryFnData, TError, TData> = Omit<
  UseSelectProps<TQueryFnData, TError, TData>,
  "defaultValue"
> & {
  /**
   * Sets the default value
   */
  defaultValue?: BaseKey;
};

/**
 * `useRadioGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/radio/#components-radio-demo-radiogroup-with-name Radio.Group} component when records in a resource needs to be used as radio options.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/field/useRadioGroup/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useRadioGroup = <
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
  selectedOptionsOrder,
  onLiveEvent,
  liveParams,
  meta,
  metaData,
  dataProviderName,
}: UseRadioGroupProps<TQueryFnData, TError, TData>): UseRadioGroupReturnType<
  TData,
  TOption
> => {
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
    selectedOptionsOrder,
    onLiveEvent,
    liveParams,
    meta: pickNotDeprecated(meta, metaData),
    metaData: pickNotDeprecated(meta, metaData),
    dataProviderName,
  });

  return {
    radioGroupProps: {
      options,
      defaultValue,
    },
    queryResult,
  };
};
