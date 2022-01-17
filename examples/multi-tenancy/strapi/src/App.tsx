import { Refine } from "@pankod/refine";
import { DataProvider } from "@pankod/refine-strapi-v4";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";

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
                authProvider={authProvider}
                dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
                routerProvider={routerProvider}
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
            />
        </StoreProvider>
    );
};

export default App;
