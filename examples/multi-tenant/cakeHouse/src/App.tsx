import { Refine } from "@pankod/refine";
import { dataProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";

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
                dataProvider={dataProvider(appwriteClient)}
                authProvider={authProvider}
                LoginPage={Login}
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
            />
        </StoreProvider>
    );
}

export default App;
