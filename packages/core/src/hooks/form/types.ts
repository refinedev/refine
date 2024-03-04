import { Dispatch, SetStateAction } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";

import {
  BaseRecord,
  CreateResponse,
  GetOneResponse,
  HttpError,
  LiveModeProps,
  RedirectAction,
  SuccessErrorNotification,
  UpdateResponse,
  MutationMode,
  BaseKey,
  IQueryKeys,
  FormAction,
  MetaQuery,
  AutoSaveProps,
  AutoSaveReturnType,
  OptimisticUpdateMapType,
} from "../../interfaces";
import { UseUpdateProps, UseUpdateReturnType } from "../data/useUpdate";
import { UseCreateProps, UseCreateReturnType } from "../data/useCreate";
import {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
} from "../useLoadingOvertime";

export type ActionParams = {
  /**
   * Type of the form mode
   * @default Action that it reads from route otherwise "create" is used
   */
  action?: FormAction;
};

type ActionFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = {
  /**
   * Resource name for API data interactions
   * @default Resource name that it reads from route
   */
  resource?: string;
  /**
   * Record id for fetching
   * @default Id that it reads from the URL
   */
  id?: BaseKey;
  /**
   * Page to redirect after a succesfull mutation
   * @type `"show" | "edit" | "list" | "create" | false`
   * @default `"list"`
   */
  redirect?: RedirectAction;
  /**
   * Metadata query for dataProvider
   */
  meta?: MetaQuery;
  /**
   * Metadata query for dataProvider
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  /**
   * Metadata to pass for the `useOne` query
   */
  queryMeta?: MetaQuery;
  /**
   * Metadata to pass for the mutation (`useCreate` for `create` and `clone` actions, `useUpdate` for `edit` action)
   */
  mutationMeta?: MetaQuery;
  /**
   * [Determines when mutations are executed](/advanced-tutorials/mutation-mode.md)
   * @default `"pessimistic"*`
   */
  mutationMode?: MutationMode;
  /**
   * Called when a mutation is successful
   */
  onMutationSuccess?: (
    data: CreateResponse<TResponse> | UpdateResponse<TResponse>,
    variables: TVariables,
    context: any,
    isAutoSave?: boolean,
  ) => void;
  /**
   * Called when a mutation encounters an error
   */
  onMutationError?: (
    error: TResponseError,
    variables: TVariables,
    context: any,
    isAutoSave?: boolean,
  ) => void;
  /**
   * Duration to wait before executing mutations when `mutationMode = "undoable"`
   * @default `5000*`
   */
  undoableTimeout?: number;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
  /**
   * You can use it to manage the invalidations that will occur at the end of the mutation.
   * @type  `all`, `resourceAll`, `list`, `many`, `detail`, `false`
   * @default `["list", "many", "detail"]`
   */
  invalidates?: Array<keyof IQueryKeys>;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options of useOne hook used while in edit mode.
   */
  queryOptions?: UseQueryOptions<
    GetOneResponse<TQueryFnData>,
    TError,
    GetOneResponse<TData>
  >;
  /**
   * react-query's [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation) options of useCreate hook used while submitting in create and clone modes.
   */
  createMutationOptions?: UseCreateProps<
    TResponse,
    TResponseError,
    TVariables
  >["mutationOptions"];
  /**
   * react-query's [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation) options of useUpdate hook used while submitting in edit mode.
   */
  updateMutationOptions?: UseUpdateProps<
    TResponse,
    TResponseError,
    TVariables
  >["mutationOptions"];
  /**
   * If you customize the [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) option, you can use it to manage the invalidations that will occur at the end of the mutation.
   * @default {
   *   list: true,
   *   many: true,
   *   detail: true,
   * }
   */
  optimisticUpdateMap?: OptimisticUpdateMapType<TResponse, TVariables>;
} & SuccessErrorNotification<
  UpdateResponse<TResponse> | CreateResponse<TResponse>,
  TResponseError,
  { id: BaseKey; values: TVariables } | TVariables
> &
  ActionParams &
  LiveModeProps;

export type UseFormProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = ActionFormProps<
  TQueryFnData,
  TError,
  TVariables,
  TData,
  TResponse,
  TResponseError
> &
  ActionParams &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps &
  AutoSaveProps<TVariables>;

export type UseFormReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
  TData extends BaseRecord = TQueryFnData,
  TResponse extends BaseRecord = TData,
  TResponseError extends HttpError = TError,
> = {
  id?: BaseKey;
  setId: Dispatch<SetStateAction<BaseKey | undefined>>;
  queryResult?: QueryObserverResult<GetOneResponse<TData>, TError>;
  mutationResult:
    | UseUpdateReturnType<TResponse, TResponseError, TVariables>
    | UseCreateReturnType<TResponse, TResponseError, TVariables>;
  formLoading: boolean;
  submit: (
    values: TVariables,
  ) => Promise<CreateResponse<TResponse> | UpdateResponse<TResponse> | void>;
  /**
   * @deprecated Use `submit` instead.
   */
  onFinish: UseFormReturnType<
    TQueryFnData,
    TError,
    TVariables,
    TData,
    TResponse,
    TResponseError
  >["submit"];
  redirect: (
    redirect: RedirectAction,
    idFromFunction?: BaseKey | undefined,
    routeParams?: Record<string, string | number>,
  ) => void;
} & UseLoadingOvertimeReturnType &
  AutoSaveReturnType<TResponse, TResponseError, TVariables>;
