import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-airtable";
import axios from "axios";
import Airtable from "airtable";

import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate } from "pages/categories";

const API_URL = "https://api.airtable.com/v0";

const App: React.FC = () => {
    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
        Authorization: `Bearer keywoytODSr6xAqfg`,
    };

    const base = new Airtable({ apiKey: "keywoytODSr6xAqfg" }).base(
        "appKYl1H4k9g73sBT",
    );

    return (
        <Admin dataProvider={dataProvider(API_URL, base)}>
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
            <Resource
                name="categories"
                list={CategoryList}
                create={CategoryCreate}
            />
        </Admin>
    );
};

export default App;
