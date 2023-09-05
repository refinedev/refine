import { BaseKey, GetListResponse } from ".";

export type OptimisticUpdateMapType<TData, TVariables> = {
    list?:
        | ((
              previous: GetListResponse<TData> | null,
              values: TVariables,
              id: BaseKey,
          ) => GetListResponse<TData> | null)
        | boolean;
    many?:
        | ((
              previous: GetListResponse<TData> | null,
              values: TVariables,
              id: BaseKey,
          ) => GetListResponse<TData> | null)
        | boolean;
    one?:
        | ((
              previous: GetListResponse<TData> | null,
              values: TVariables,
          ) => GetListResponse<TData> | null)
        | boolean;
};

export type OptimisticUpdateManyMapType<TData, TVariables> = {
    list?:
        | ((
              previous: GetListResponse<TData> | null,
              values: TVariables,
              ids: BaseKey[],
          ) => GetListResponse<TData> | null)
        | boolean;
    many?:
        | ((
              previous: GetListResponse<TData> | null,
              values: TVariables,
              ids: BaseKey[],
          ) => GetListResponse<TData> | null)
        | boolean;
    one?:
        | ((
              previous: GetListResponse<TData> | null,
              values: TVariables,
              id: BaseKey,
          ) => GetListResponse<TData> | null)
        | boolean;
};
