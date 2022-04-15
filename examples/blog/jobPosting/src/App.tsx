import { Refine } from "@pankod/refine";

import routerProvider from "@pankod/refine-react-router-v6";

import "styles/antd.less";
import nestjsxCrudDataProvider from "@pankod/refine-nestjsx-crud";
import {
    CompanyList,
    CompanyShow,
    CompanyCreate,
    CompanyEdit,
} from "./pages/companies";
import {
    Title,
    Header,
    Sider,
    Footer,
    Layout,
    OffLayoutArea,
} from "components";
import { JobList, JobCreate, JobEdit } from "pages/jobs";

function App() {
    const API_URL = "http://localhost:3000";
    const dataProvider = nestjsxCrudDataProvider(API_URL);

    return (
        <Refine
            dataProvider={dataProvider}
            Title={Title}
            Header={Header}
            Sider={Sider}
            Footer={Footer}
            Layout={Layout}
            OffLayoutArea={OffLayoutArea}
            routerProvider={routerProvider}
            resources={[
                {
                    name: "companies",
                    list: CompanyList,
                    create: CompanyCreate,
                    edit: CompanyEdit,
                    show: CompanyShow,
                },
                {
                    name: "jobs",
                    list: JobList,
                    create: JobCreate,
                    edit: JobEdit,
                    show: CompanyShow,
                },
            ]}
        />
    );
}

export default App;
