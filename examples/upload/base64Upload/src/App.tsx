import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";

import { UserList, UserCreate, UserEdit, UserShow } from "pages/users";

const API_URL = "https://api.fake-rest.refine.dev";

const routeProvider = routerProvider();

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routeProvider}
            resources={[
                {
                    name: "users",
                    list: UserList,
                    create: UserCreate,
                    edit: UserEdit,
                    show: UserShow,
                },
            ]}
        />
    );
};

export default App;
