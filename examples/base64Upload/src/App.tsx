import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { UserList, UserCreate, UserEdit, UserShow } from "pages/users";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Admin dataProvider={dataProvider(API_URL)}>
            <Resource
                name="users"
                list={UserList}
                create={UserCreate}
                edit={UserEdit}
                show={UserShow}
            />
        </Admin>
    );
};

export default App;
