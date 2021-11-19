import { BaseRecord } from "../../interfaces";

export type LiveEvent = {
    channel: string;
    type: "deleted" | "updated" | "created" | "*";
    payload: BaseRecord;
    date: Date;
};

export type ILiveContext =
    | {
          publish: (event: LiveEvent) => void;
          subscribe: (options: {
              channel: string;
              type: LiveEvent["type"];
              callback: (event: LiveEvent) => void;
          }) => any;
          unsubscribe: (subscription: any) => void;
      }
    | undefined;

export type ILiveContextProvider = {
    liveProvider: ILiveContext;
};
