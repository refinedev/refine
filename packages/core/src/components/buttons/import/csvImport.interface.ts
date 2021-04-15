import { BaseRecord } from "../../../interfaces";

export interface MapDataFn {
    (
        value: BaseRecord,
        index?: number,
        array?: BaseRecord[],
        data?: unknown[][],
    ): BaseRecord;
}
