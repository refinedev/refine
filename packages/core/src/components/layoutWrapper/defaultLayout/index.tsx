import React, { ReactNode } from "react";

export const DefaultLayout: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    return <div>{children}</div>;
};
