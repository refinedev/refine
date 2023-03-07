import { Refine } from "@refinedev/core";
import {
    notificationProvider,
    LoginPage,
    Layout,
    ErrorComponent,
} from "@refinedev/antd";
import { DataProvider } from "@refinedev/strapi-v4";
import routerProvider from "@refinedev/react-router-v6";

import "@refinedev/antd";

import { StoreProvider } from "context/store";
import { CustomSider } from "components/sider";
import { ProductList } from "pages/product";
import { OrderList, CreateOrder, OrderEdit } from "pages/order";
import { API_URL } from "./constants";
import { authProvider, axiosInstance } from "./authProvider";

const App: React.FC = () => {
    return (
        <StoreProvider>
            <Refine
                legacyAuthProvider={authProvider}
                dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
                legacyRouterProvider={routerProvider}
                Sider={CustomSider}
                resources={[
                    {
                        name: "products",
                        list: ProductList,
                    },
                    {
                        name: "orders",
                        list: OrderList,
                        create: CreateOrder,
                        edit: OrderEdit,
                    },
                ]}
                notificationProvider={notificationProvider}
                LoginPage={LoginPage}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
        </StoreProvider>
    );
};

export default App;
