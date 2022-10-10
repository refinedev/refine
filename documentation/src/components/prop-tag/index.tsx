import React from "react";

type Props = {
    asterisk?: boolean;
    deprecated?: boolean;
    required?: boolean;
    featured?: boolean;
    alt?: string;
};

const PropTag: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    asterisk,
    deprecated,
    required,
    featured,
    alt,
}) => {
    if (deprecated) {
        return (
            <div className="prop--tag prop--tag__deprecated" title={alt}>
                {children ?? "deprecated"}
            </div>
        );
    }

    if (asterisk) {
        return (
            <div className="prop--tag__required" title={alt}>
                {children ?? "﹡"}
            </div>
        );
    }

    if (required) {
        return (
            <div className="prop--tag prop--tag__required" title={alt}>
                {children ?? "required"}
            </div>
        );
    }

    if (featured) {
        return (
            <div className="prop--tag prop--tag__featured" title={alt}>
                {children ?? "featured"}
            </div>
        );
    }

    if (children) {
        return (
            <div className="prop--tag" title={alt}>
                {children}
            </div>
        );
    }

    return null;
};

export default PropTag;
