import { BaseRecord } from ".";

export type LiveEventType = {
    channel: string;
    type: "deleted" | "updated" | "created";
    payload: BaseRecord;
    date: Date;
};
