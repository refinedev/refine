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
                  [key: string]: any;
              };
              types: LiveEvent["type"][];
              callback: (event: LiveEvent) => void;
              resource: string;
              metaData?: MetaDataQuery;
              pagination?: Pagination;
              hasPagination?: boolean;
              sort?: CrudSorting;
              filters?: CrudFilters;
              subscriptionType: "list" | "one" | "many";
          }) => any;
          unsubscribe: (subscription: any) => void;
      }
    | undefined;

export type ILiveContextProvider = {
    liveProvider: ILiveContext;
};
