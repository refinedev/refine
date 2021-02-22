import React from "react";
import { get } from "lodash";

import { BaseFieldProps } from "@interfaces";

export const renderFieldRecord = ({
    value,
    record,
    renderRecordKey,
}: BaseFieldProps): string => {
    if (record && renderRecordKey) {
        const recordValue = get(record, renderRecordKey);
        if (recordValue) {
            return recordValue;
        } else {
            throw new Error("undefined record or renderRecordKey");
        }
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
