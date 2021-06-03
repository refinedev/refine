import React, { FC, useContext, useEffect } from "react";
import { Prompt } from "react-router-dom";

import { useTranslate, useWarnAboutChange } from "@hooks";
import { AdminContext } from "@contexts/admin/";
import { IAdminContext } from "@contexts/admin/IAdminContext";

export interface LayoutWrapperProps {
    dashboard?: boolean;
}

export const LayoutWrapper: FC<LayoutWrapperProps> = ({
    children,
    dashboard,
}) => {
    const { Layout, Footer, Header, Sider, Title, OffLayoutArea } =
        useContext<IAdminContext>(AdminContext);

    const translate = useTranslate();

    const { warnWhen } = useWarnAboutChange();

    const warnWhenListener = (e: {
        preventDefault: () => void;
        returnValue: string;
    }) => {
        e.preventDefault();

        e.returnValue = translate(
            "warnWhenUnsavedChanges",
            "Are you sure you want to leave? You have with unsaved changes.",
        );

        return e.returnValue;
    };

    useEffect(() => {
        if (warnWhen) {
            window.addEventListener("beforeunload", warnWhenListener);
        }

        return window.removeEventListener("beforeunload", warnWhenListener);
    }, [warnWhen]);

    return (
        <Layout
            Sider={Sider}
            Header={Header}
            Footer={Footer}
            Title={Title}
            OffLayoutArea={OffLayoutArea}
            dashboard={dashboard}
        >
            {children}
            <Prompt
                when={warnWhen}
                message={translate(
                    "warnWhenUnsavedChanges",
                    "Are you sure you want to leave? You have with unsaved changes.",
                )}
            />
        </Layout>
    );
};
