import { LayoutProps } from "@pankod/refine-core";

import { Header, Footer } from "components";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
};
