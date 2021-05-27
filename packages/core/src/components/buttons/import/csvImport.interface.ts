import { BaseRecord } from "../../../interfaces";

export interface MapDataFn {
    (
        value: any,
        index?: number,
        array?: any[],
        data?: any[][],
    ): any;
}
