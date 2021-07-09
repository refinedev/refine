import React, { FC, useContext, useEffect } from "react";
import { Prompt } from "react-router-dom";

import { useTranslate, useWarnAboutChange } from "@hooks";
import { RefineContext } from "@contexts/refine";
import { IRefineContext } from "@contexts/refine/IRefineContext";

export interface LayoutWrapperProps {
    dashboard?: boolean;
    hideSider?: boolean;
}

export const LayoutWrapper: FC<LayoutWrapperProps> = ({
    children,
    dashboard,
    hideSider,
}) => {
    const { Layout, Footer, Header, Sider, Title, OffLayoutArea } =
        useContext<IRefineContext>(RefineContext);

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

    console.log("hideSider", hideSider);
    return (
        <Layout
            Sider={hideSider ? () => null : Sider}
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
