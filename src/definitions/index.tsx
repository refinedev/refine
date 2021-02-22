import React from "react";
import get from "lodash/get";

import { BaseFieldProps } from "@interfaces";

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
> &
    {
        [K in Keys]-?: Required<Pick<T, K>> &
            Partial<Record<Exclude<Keys, K>, undefined>>;
    }[Keys];

export const renderFieldRecord = ({
    value,
    record,
    renderRecordKey,
}: RequireOnlyOne<BaseFieldProps, "value" | "record">): string => {
    if (record && renderRecordKey) {
        const recordValue = get(record, renderRecordKey);

        if (!recordValue) {
            throw new Error("undefined record or renderRecordKey value");
        }

        return recordValue;
    }

    return value;
};

interface IOptionalComponent {
    optional?: React.ComponentType | false;
}

export const OptionalComponent: React.ComponentType<IOptionalComponent> = ({
    optional,
    children,
}) => {
    if (optional === false) {
        return null;
    }
    if (optional === undefined) {
        return <>{children}</>;
    }
    return React.createElement(optional);
};
