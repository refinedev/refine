import {
    BaseKey,
    CrudFilters,
    CrudSorting,
    LiveEvent,
    MetaDataQuery,
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
                  metaData?: MetaDataQuery;
                  pagination?: Pagination;
                  hasPagination?: boolean;
                  sort?: CrudSorting;
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
