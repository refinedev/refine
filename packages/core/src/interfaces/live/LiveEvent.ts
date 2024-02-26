import { BaseKey, MetaQuery } from "..";

export type LiveEvent = {
  channel: string;
  type: "deleted" | "updated" | "created" | "*" | string;
  payload: {
    ids?: BaseKey[];
    [x: string]: any;
  };
  date: Date;
  meta?: MetaQuery & {
    dataProviderName?: string;
  };
};
