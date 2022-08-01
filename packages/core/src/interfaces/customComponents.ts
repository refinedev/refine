import React, { ReactNode } from "react";

export type TitleProps = {
    collapsed: boolean;
};

export type LayoutProps = {
    Sider?: React.FC;
    Header?: React.FC;
    Title?: React.FC<TitleProps>;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
    dashboard?: boolean;
    children?: ReactNode;
};
