import React, { FC } from "react";
import {
    PageHeader as AntdPageHeader,
    PageHeaderProps as AntdPageHeaderProps,
} from "@ant-design/pro-layout";

export type PageHeaderProps = AntdPageHeaderProps;

export const PageHeader: FC<AntdPageHeaderProps> = ({ children, ...props }) => {
    return <AntdPageHeader {...props}>{children}</AntdPageHeader>;
};
