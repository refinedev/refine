import { Footer } from "components/footer";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="main">
            <div className="layout">{children}</div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
