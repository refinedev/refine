import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import {
    UserList,
    // UserCreate,
    UserEdit,
} from "pages/users";

const API_URL = "https://refine-fake-rest.pankod.com";

const App = () => {
    return (
        <Admin dataProvider={dataProvider(API_URL)}>
            <Resource
                name="users"
                list={UserList}
                // create={UserCreate}
                edit={UserEdit}
            />
        </Admin>
    );
};

export default App;
