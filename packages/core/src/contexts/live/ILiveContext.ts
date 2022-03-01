import { BaseKey, LiveEvent } from "../../interfaces";

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
          }) => any;
          unsubscribe: (subscription: any) => void;
      }
    | undefined;

export type ILiveContextProvider = {
    liveProvider: ILiveContext;
};
