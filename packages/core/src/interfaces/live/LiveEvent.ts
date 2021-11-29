import { BaseRecord } from "..";

export type LiveEvent = {
    channel: string;
    type: "deleted" | "updated" | "created" | "*" | string;
    payload: BaseRecord | any;
    date: Date;
};
