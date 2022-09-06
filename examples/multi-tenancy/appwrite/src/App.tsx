import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";

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
                routerProvider={routerProvider}
                liveProvider={liveProvider(appwriteClient)}
                dataProvider={dataProvider(appwriteClient)}
                authProvider={authProvider}
                LoginPage={Login}
                options={{ liveMode: "auto" }}
                Sider={CustomSider}
                resources={[
                    {
                        name: "61cb01b17ef57",
                        list: ProductList,
                        show: ProductShow,
                        options: {
                            label: "Products",
                            route: "products",
                        },
                    },
                    {
                        name: "61cb019fdbd11",
                        list: OrderList,
                        create: CreateOrder,
                        edit: OrderEdit,
                        options: {
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
