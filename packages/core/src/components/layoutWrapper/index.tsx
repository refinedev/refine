import React, { FC, useContext, useEffect } from "react";
import { Prompt } from "react-router-dom";

import { useTranslate, useWarnAboutChange } from "@hooks";
import { RefineContext } from "@contexts/refine";
import { IRefineContext } from "@contexts/refine/IRefineContext";
import { LayoutProps, TitleProps } from "../../interfaces";

export interface LayoutWrapperProps {
    dashboard?: boolean;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Title?: React.FC<TitleProps>;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
}

export const LayoutWrapper: FC<LayoutWrapperProps> = ({
    children,
    dashboard,
    Layout: LayoutFromProps,
    Sider: SiderFromProps,
    Header: HeaderFromProps,
    Title: TitleFromProps,
    Footer: FooterFromProps,
    OffLayoutArea: OffLayoutAreaFromProps,
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

    const LayoutToRender = LayoutFromProps ?? Layout;

    return (
        <LayoutToRender
            Sider={SiderFromProps ?? Sider}
            Header={HeaderFromProps ?? Header}
            Footer={FooterFromProps ?? Footer}
            Title={TitleFromProps ?? Title}
            OffLayoutArea={OffLayoutAreaFromProps ?? OffLayoutArea}
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
        </LayoutToRender>
    );
};
