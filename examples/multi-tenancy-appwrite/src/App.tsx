import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import routerProvider from "@refinedev/react-router-v6/legacy";

import "@refinedev/antd/dist/reset.css";

import { appwriteClient } from "utility";
import { authProvider } from "./authProvider";

import { CustomSider } from "components/sider";
import { Login } from "pages/login";
import { ProductList } from "pages/products";
import { CreateOrder, OrderList, OrderEdit } from "pages/orders";
import { ProductShow } from "components/product";
import { StoreProvider } from "context/store";

function App() {
    return (
        <StoreProvider>
            <Refine
                legacyRouterProvider={routerProvider}
                liveProvider={liveProvider(appwriteClient)}
                dataProvider={dataProvider(appwriteClient)}
                legacyAuthProvider={authProvider}
                LoginPage={Login}
                options={{ liveMode: "auto" }}
                Sider={CustomSider}
                resources={[
                    {
                        name: "61cb01b17ef57",
                        list: ProductList,
                        show: ProductShow,
                        meta: {
                            label: "Products",
                            route: "products",
                        },
                    },
                    {
                        name: "61cb019fdbd11",
                        list: OrderList,
                        create: CreateOrder,
                        edit: OrderEdit,
                        meta: {
                            label: "Orders",
                            route: "orders",
                        },
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
        </StoreProvider>
    );
}

export default App;
