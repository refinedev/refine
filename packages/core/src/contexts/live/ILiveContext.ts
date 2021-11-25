import { LiveEvent } from "../../interfaces";

export type ILiveContext =
    | {
          publish: (event: LiveEvent) => void;
          subscribe: (options: {
              channel: string;
              params?: {
                  id?: string;
                  [key: string]: any;
              };
              type: LiveEvent["type"];
              callback: (event: LiveEvent) => void;
          }) => any;
          unsubscribe: (subscription: any) => void;
      }
    | undefined;

export type ILiveContextProvider = {
    liveProvider: ILiveContext;
};
