import React from "react";

export type TitleProps = {
    collapsed: boolean;
};

export type LayoutProps = {
    Sider: React.FC;
    Header: React.FC;
    Footer: React.FC;
    OffLayoutArea: React.FC;
    dashboard?: boolean;
};
