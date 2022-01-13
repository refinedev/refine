import React from "react";
import { MemoryRouter } from "react-router-dom";

import { Refine } from "@pankod/refine-core";

import { MockRouterProvider, MockJSONServer } from "@test";
import {
    I18nProvider,
    IAccessControlContext,
    IAuthContext,
    IDataContext,
    INotificationContext,
    ResourceProps,
} from "@pankod/refine-core/dist/interfaces";

/* interface ITestWrapperProps {
    authProvider?: IAuthContext;
    dataProvider?: IDataContext;
    i18nProvider?: I18nProvider;
    accessControlProvider?: IAccessControlContext;
    liveProvider?: ILiveContext;
    resources?: IResourceItem[];
    children?: React.ReactNode;
    routerInitialEntries?: string[];
    refineProvider?: IRefineContextProvider;
} */

const List = () => {
    return <div>hede</div>;
};
interface ITestWrapperProps {
    dataProvider?: IDataContext;
    authProvider?: IAuthContext;
    resources?: ResourceProps[];
    notificationProvider?: INotificationContext;
    accessControlProvider?: IAccessControlContext;
    i18nProvider?: I18nProvider;
    routerInitialEntries?: string[];
    DashboardPage?: React.FC;
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    dataProvider,
    authProvider,
    resources,
    notificationProvider,
    accessControlProvider,
    routerInitialEntries,
    DashboardPage,
    i18nProvider,
}) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        return (
            <MemoryRouter initialEntries={routerInitialEntries}>
                <Refine
                    dataProvider={dataProvider ?? MockJSONServer}
                    i18nProvider={i18nProvider}
                    routerProvider={MockRouterProvider}
                    authProvider={authProvider}
                    notificationProvider={notificationProvider}
                    resources={resources ?? [{ name: "posts", list: List }]}
                    accessControlProvider={accessControlProvider}
                    DashboardPage={DashboardPage ?? null}
                >
                    {children}
                </Refine>
            </MemoryRouter>
        );
    };
};
export {
    MockJSONServer,
    MockRouterProvider,
    MockAccessControlProvider,
    MockLiveProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
