import React from "react";

type Props = {
    asterisk?: boolean;
    deprecated?: boolean;
    required?: boolean;
    featured?: boolean;
};

const PropTag: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    asterisk,
    deprecated,
    required,
    featured,
}) => {
    if (deprecated) {
        return (
            <div className="prop--tag prop--tag__deprecated">
                {children ?? "deprecated"}
            </div>
        );
    }

    if (asterisk) {
        return (
            <div className="prop--tag prop--tag__required">
                {children ?? "✱"}
            </div>
        );
    }

    if (required) {
        return (
            <div className="prop--tag prop--tag__required">
                {children ?? "required"}
            </div>
        );
    }

    if (featured) {
        return (
            <div className="prop--tag prop--tag__featured">
                {children ?? "featured"}
            </div>
        );
    }

    if (children) {
        return <div className="prop--tag">{children}</div>;
    }

    return null;
};

export default PropTag;
