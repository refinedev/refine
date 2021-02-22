import { BaseRecord } from "@contexts/data/IDataContext";

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
> &
    {
        [K in Keys]-?: Required<Pick<T, K>> &
            Partial<Record<Exclude<Keys, K>, undefined>>;
    }[Keys];

export type BaseFieldProps = RequireOnlyOne<
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
        record: BaseRecord;
        renderRecordKey?: string;
    },
    "value" | "record"
>;
