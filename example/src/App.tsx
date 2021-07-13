import React from "react";
import {
    Refine,
    Resource,
    AuthProvider,
    Icons,
    Authenticated,
    defaultConfigProviderProps,
    BackTop,
    AntdLayout,
    Button,
} from "@pankod/refine";
import { DemoSidebar, useDemoSidebar } from "@pankod/refine-demo-sidebar";
import "@pankod/refine/dist/styles.min.css";

import dataProvider from "@pankod/refine-simple-rest";
import { useTranslation } from "react-i18next";

import {
    PostCreate,
    PostList,
    PostEdit,
    PostShow,
    CategoryList,
    CategoryCreate,
    UserList,
    DashboardPage,
    ReadyPage,
    TagList,
} from "./components/pages";

const App: React.FC = () => {
    const [refineProps, demoSidebarProps] = useDemoSidebar();

    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.username === "admin") {
                localStorage.setItem("username", params.username);
                return Promise.resolve();
            }

            return Promise.reject(new Error("Invalid username or password"));
        },
        logout: (params) => {
            console.log({ params });
            localStorage.removeItem("username");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("username")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["admin"]),
        getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                fullName: "Jane Doe",
                avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    const CustomPage = () => {
        return <div>anon and authenticated custom page</div>;
    };

    const AuthenticatedCustomPage = () => {
        return (
            <Authenticated>
                <div>authenticated custom page</div>
            </Authenticated>
        );
    };

    return (
        <Refine
            authProvider={authProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            DashboardPage={DashboardPage}
            ReadyPage={ReadyPage}
            i18nProvider={i18nProvider}
            routes={[
                {
                    exact: true,
                    component: CustomPage,
                    path: "/custom",
                },
                {
                    exact: true,
                    component: AuthenticatedCustomPage,
                    path: "/customauth",
                },
            ]}
            configProviderProps={{
                ...defaultConfigProviderProps,
            }}
            Layout={({ children, Sider, Header, Footer, OffLayoutArea }) => (
                <AntdLayout
                    style={{ minHeight: "100vh", flexDirection: "row" }}
                >
                    <Sider />
                    <AntdLayout>
                        <Header />
                        <AntdLayout.Content>
                            <div style={{ padding: 24, minHeight: 360 }}>
                                {children}
                            </div>
                        </AntdLayout.Content>
                        <Footer />
                    </AntdLayout>
                    <OffLayoutArea />
                </AntdLayout>
            )}
            Footer={() => (
                <AntdLayout.Footer style={{ textAlign: "center" }}>
                    Refine ©{new Date().getFullYear()} Created by Pankod
                    (Example Footer)
                </AntdLayout.Footer>
            )}
            Header={() => (
                <AntdLayout.Header
                    style={{ padding: 0, backgroundColor: "#FFF" }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            height: "100%",
                            alignItems: "center",
                            padding: "24px",
                        }}
                    >
                        <Button
                            size="middle"
                            type={
                                i18n.language === "en" ? "primary" : undefined
                            }
                            onClick={() => i18n.changeLanguage("en")}
                        >
                            EN
                        </Button>
                        <Button
                            size="middle"
                            type={
                                i18n.language === "tr" ? "primary" : undefined
                            }
                            onClick={() => i18n.changeLanguage("tr")}
                        >
                            TR
                        </Button>
                    </div>
                </AntdLayout.Header>
            )}
            OffLayoutArea={() => (
                <>
                    <BackTop />
                    {/* <DemoSidebar {...demoSidebarProps} /> */}
                </>
            )}
            {...refineProps}
            syncWithLocation={true}
        >
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
                canDelete
            />
            <Resource
                name="categories"
                list={CategoryList}
                create={CategoryCreate}
                canDelete
            />
            <Resource
                name="users"
                list={UserList}
                icon={<Icons.UserOutlined />}
            />
            <Resource
                name="tags"
                list={TagList}
                /* edit={TagsEdit}
            create={TagsCreate}
            icon={<Icons.TagsOutlined />} */
            />
        </Refine>
    );
};

export default App;
