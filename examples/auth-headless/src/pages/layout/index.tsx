import { useLogout } from "@refinedev/core";
import React, { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { mutate: logout } = useLogout();

    return (
        <div>
            <div
                style={{
                    marginBottom: "1rem",
                }}
            >
                <button onClick={() => logout()}>Logout</button>
            </div>
            {children}
        </div>
    );
};

export default Layout;
