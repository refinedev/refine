import { FC } from "react";

export type TitleProps = {
    collapsed: boolean;
};

export type CustomLayoutProps = {
    Sider?: FC<unknown>;
    Header?: FC<unknown>;
    Footer?: FC<unknown>;
};
