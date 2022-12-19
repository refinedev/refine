import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import nestjsxCrudDataProvider from "@pankod/refine-nestjsx-crud";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import {
    CompanyList,
    CompanyShow,
    CompanyCreate,
    CompanyEdit,
} from "./pages/companies";
import { JobList, JobCreate, JobEdit } from "pages/jobs";

const API_URL = "http://localhost:3000";
const dataProvider = nestjsxCrudDataProvider(API_URL);

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                /**
                 * By default refine uses the first route with `list` property as the initial route.
                 * If you want to change the initial route, you can bind the `initialRoute` property to the `RouterComponent` property.
                 *
                 * Example:
                 *
                 *  RouterComponent: routerProvider.RouterComponent.bind({
                 *     initialRoute: "/posts",
                 *  }),
                 */
            }}
            dataProvider={dataProvider}
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
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
