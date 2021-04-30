import React, { FC, useContext, useEffect } from "react";
import { Layout as AntLayout } from "antd";
import { Prompt } from "react-router-dom";

import { useTranslate, useWarnAboutChange } from "@hooks";
import { AdminContext } from "@contexts/admin/";
import { IAdminContext } from "@contexts/admin/IAdminContext";

import { Sider as DefaultSider } from "./components/sider";
import { Header as DefaultHeader } from "./components/header";
import { Footer as DefaultFooter } from "./components/footer";

const DefaultOffLayoutArea = () => null;
export interface LayoutProps {
    dashboard?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, dashboard }) => {
    const {
        CustomLayout,
        CustomFooter,
        CustomHeader,
        CustomSider,
        OffLayoutArea,
    } = useContext<IAdminContext>(AdminContext);

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

    if (CustomLayout) {
        return (
            <CustomLayout
                Sider={CustomSider ?? DefaultSider}
                Header={CustomHeader ?? DefaultHeader}
                Footer={CustomFooter ?? DefaultFooter}
                OffLayoutArea={OffLayoutArea ?? DefaultOffLayoutArea}
            >
                {children}
                <Prompt
                    when={warnWhen}
                    message={translate(
                        "common:warnWhenUnsavedChanges",
                        "Are you sure you want to leave? You have with unsaved changes.",
                    )}
                />
            </CustomLayout>
        );
    }

    return (
        <AntLayout style={{ minHeight: "100vh" }}>
            {CustomSider ? (
                <CustomSider />
            ) : (
                <DefaultSider dashboard={dashboard} />
            )}
            <AntLayout className="site-layout">
                {CustomHeader ? <CustomHeader /> : <DefaultHeader />}
                <AntLayout.Content>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                    {OffLayoutArea && <OffLayoutArea />}
                </AntLayout.Content>
                {CustomFooter ? <CustomFooter /> : <DefaultFooter />}
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
