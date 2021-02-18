import React from "react";

import { BaseFieldProps } from "@interfaces";

export const fieldContent = ({ record, source }: BaseFieldProps) => {
    return record && source ? record[source].toString() : source;
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
