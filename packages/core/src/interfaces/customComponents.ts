import { FC } from "react";

export type TitleProps = {
    collapsed: boolean;
};

export type LayoutProps = {
    Sider: FC<SiderProps>;
    Header: FC<unknown>;
    Footer: FC<unknown>;
    OffLayoutArea: FC<unknown>;
    dashboard?: boolean;
};

export type SiderProps = {
    dashboard?: boolean;
};
