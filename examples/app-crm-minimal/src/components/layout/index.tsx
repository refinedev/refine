import React from "react";

import { ThemedLayoutV2 } from "@refinedev/antd";

import { Header } from "./header";

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <ThemedLayoutV2 Header={Header}>{children}</ThemedLayoutV2>;
};
