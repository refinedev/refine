import { BaseRecord } from "@contexts/data/IDataContext";

export interface BaseFieldProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    record: BaseRecord;
    renderRecordKey?: string;
}
