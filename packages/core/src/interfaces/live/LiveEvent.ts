import { BaseRecord } from "..";

export type LiveEvent = {
    channel: string;
    type: "deleted" | "updated" | "created" | "*";
    payload: BaseRecord;
    date: Date;
};
