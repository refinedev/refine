import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import { authProvider } from "authProvider";
import { OrderList, OrderShow } from "pages/orders";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider}
            ReadyPage={ReadyPage}
            Layout={Layout}
            LoginPage={LoginPage}
            catchAll={<ErrorComponent />}
            syncWithLocation
            warnWhenUnsavedChanges
            resources={[
                {
                    name: "orders",
                    list: OrderList,
                    show: OrderShow,
                    icon: <AddShoppingCartOutlinedIcon />,
                },
            ]}
        />
    );
};

export default App;
