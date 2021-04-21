import React from "react";
import get from "lodash/get";

import { FieldProps } from "../../interfaces";

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
