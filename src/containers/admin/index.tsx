import React from "react";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

import { Auth, IAuthProps } from "@containers/auth";
import { store } from "@redux/store";

export interface AdminProps {
    authProvider: IAuthProps;
}

export const Admin: React.FC<AdminProps> = ({ authProvider, children }) => {
    return (
        <Provider store={store}>
            <Auth {...authProvider}>{children}</Auth>
        </Provider>
    );
};
