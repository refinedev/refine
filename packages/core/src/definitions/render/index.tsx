import React from "react";

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
