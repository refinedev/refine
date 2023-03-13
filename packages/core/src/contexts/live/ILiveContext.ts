import {
    BaseKey,
    CrudFilters,
    CrudSorting,
    LiveEvent,
    MetaQuery,
    Pagination,
} from "../../interfaces";

export type ILiveContext =
    | {
          publish?: (event: LiveEvent) => void;
          subscribe: (options: {
              channel: string;
              params?: {
                  ids?: BaseKey[];
                  id?: BaseKey;
                  meta?: MetaQuery;
                  /**
                   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
                   */
                  metaData?: MetaQuery;
                  pagination?: Pagination;
                  /**
                   * @deprecated `hasPagination` is deprecated, use `pagination.mode` instead.
                   */
                  hasPagination?: boolean;
                  /**
                   * @deprecated `sort` is deprecated, use `sorters` instead.
                   */
                  sort?: CrudSorting;
                  sorters?: CrudSorting;
                  filters?: CrudFilters;
                  subscriptionType?: "useList" | "useOne" | "useMany";
                  resource?: string;
                  [key: string]: any;
              };
              types: LiveEvent["type"][];
              callback: (event: LiveEvent) => void;
          }) => any;
          unsubscribe: (subscription: any) => void;
      }
    | undefined;

export type ILiveContextProvider = {
    liveProvider: ILiveContext;
    children: React.ReactNode;
};
