import React, { FC } from "react";

export type PageHeaderProps = {
    ghost?: boolean;
    backIcon?: React.ReactNode;
    onBack?: (() => void) | undefined;
    title?: React.ReactNode;
    breadcrumb?: React.ReactNode;
    extra?: React.ReactNode;
    children?: JSX.Element;
};

export const PageHeader: FC<PageHeaderProps> = ({
    title,
    breadcrumb,
    extra,
    children,
}) => {
    return (
        <>
            <h4>{title}</h4>
            <div>{breadcrumb}</div>
            <div>{extra}</div>
            {children}
        </>
    );
};
