import React from "react";
import { LayoutProps } from "@pankod/refine-core";

export const Layout: React.FC<LayoutProps> = ({ children, Footer, Header }) => {
    return (
        <div className="grid grid-rows-[64px_1fr_auto] min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
