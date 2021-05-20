import React from "react";
import {
    Admin,
    Resource,
    AuthProvider,
    Icons,
    Authenticated,
    defaultConfigProviderProps,
    BackTop,
    AntdLayout,
    Button,
    useSetLocale,
} from "@pankod/refine";
import { DemoSidebar, useDemoSidebar } from "@pankod/refine-demo-sidebar";
import "@pankod/refine/dist/styles.min.css";

import dataProvider from "@pankod/refine-json-server";
import { useTranslation } from "react-i18next";

import {
    PostCreate,
    PostList,
    PostEdit,
    PostShow,
    CategoryList,
    CategoryCreate,
    UserList,
    TagsList,
    TagsCreate,
    TagsEdit,
    DashboardPage,
    ReadyPage,
} from "./components/pages";

function App() {
    const [adminProps, demoSidebarProps] = useDemoSidebar({
        defaultTitle: "Refine",
        defaultMutationMode: "pessimistic",
    });

    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.username === "admin") {
                localStorage.setItem("username", params.username);
                return Promise.resolve();
            }

            return Promise.reject(new Error("Invalid username or password"));
        },
        logout: () => {
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
                avatar:
                    "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };

    const { t, i18n } = useTranslation(["common", "translation"]);
    const setLocale = useSetLocale();

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
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
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
                    <AntdLayout className="site-layout">
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
                        <Button size="middle" onClick={() => setLocale("en")}>
                            EN
                        </Button>
                        <Button size="middle" onClick={() => setLocale("tr")}>
                            TR
                        </Button>
                    </div>
                </AntdLayout.Header>
            )}
            OffLayoutArea={() => (
                <>
                    <BackTop />
                    <DemoSidebar {...demoSidebarProps} />
                </>
            )}
            {...adminProps}
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
                list={TagsList}
                edit={TagsEdit}
                create={TagsCreate}
                icon={<Icons.TagsOutlined />}
            />
        </Admin>
    );
}

export default App;
