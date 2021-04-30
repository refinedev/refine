import React, { FC, useEffect } from "react";
import { Layout as AntLayout } from "antd";
import { Prompt } from "react-router-dom";

import { useTranslate, useWarnAboutChange } from "@hooks";
import {
    SiderProps,
    LayoutProps,
} from "../../../../interfaces/customComponents";

export const Layout: React.FC<LayoutProps> = ({
    children,
    dashboard,
    Sider,
    Header,
    Footer,
    OffLayoutArea,
}) => {
    const translate = useTranslate();
    const { warnWhen } = useWarnAboutChange();

    const warnWhenListener = (e: {
        preventDefault: () => void;
        returnValue: string;
    }) => {
        e.preventDefault();

        e.returnValue = translate(
            "common:warnWhenUnsavedChanges",
            "Are you sure you want to leave? You have with unsaved changes.",
        );

        return e.returnValue;
    };

    if (warnWhen) {
        window.addEventListener("beforeunload", warnWhenListener);
    }

    useEffect(() => {
        return window.removeEventListener("beforeunload", warnWhenListener);
    }, []);

    return (
        <AntLayout style={{ minHeight: "100vh" }}>
            <Sider dashboard={dashboard} />
            <AntLayout className="site-layout">
                <Header />
                <AntLayout.Content>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                    {OffLayoutArea && <OffLayoutArea />}
                </AntLayout.Content>
                <Footer />
            </AntLayout>
            <Prompt
                when={warnWhen}
                message={translate(
                    "common:warnWhenUnsavedChanges",
                    "Are you sure you want to leave? You have with unsaved changes.",
                )}
            />
        </AntLayout>
    );
};
