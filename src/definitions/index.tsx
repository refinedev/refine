import React from "react";

import { BaseFieldProps } from "@interfaces";

export const renderFieldRecord = ({
    value,
    record,
    renderRecordKey,
}: BaseFieldProps): string => {
    if (record && renderRecordKey && record[renderRecordKey]) {
        return record[renderRecordKey];
    }

    return `${value}`;
};

interface IOptionalComponent {
    optional?: React.FC | false;
}

export const OptionalComponent: React.FC<IOptionalComponent> = ({
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
