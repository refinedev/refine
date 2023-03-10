import React, { ReactNode } from "react";

export type TitleProps = {
    collapsed: boolean;
};

export type LayoutProps = {
    Sider?: React.FC<{
        Title?: React.FC<TitleProps>;
        render?: (props: {
            items: JSX.Element[];
            logout: React.ReactNode;
            dashboard: React.ReactNode;
            collapsed: boolean;
        }) => React.ReactNode;
        meta?: Record<string, unknown>;
    }>;
    Header?: React.FC;
    Title?: React.FC<TitleProps>;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
    dashboard?: boolean;
    children?: ReactNode;
};

export type DashboardPageProps<TCrudData = any> = {
    initialData?: TCrudData;
} & Record<any, any>;
