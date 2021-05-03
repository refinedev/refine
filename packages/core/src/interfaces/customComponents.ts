import React from "react";

export type TitleProps = {
    collapsed: boolean;
};

export type LayoutProps = {
    Sider: React.FC<SiderProps>;
    Header: React.FC;
    Footer: React.FC;
    OffLayoutArea: React.FC;
    dashboard?: boolean;
};

export type SiderProps = {
    dashboard?: boolean;
};
