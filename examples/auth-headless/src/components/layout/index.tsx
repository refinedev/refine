import { PropsWithChildren } from "react";

import { Menu } from "../menu";
import { Breadcrumb } from "../breadcrumb";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="layout">
            <Menu />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                }}
            >
                <Breadcrumb />
                <div>{children}</div>
            </div>
        </div>
    );
};
