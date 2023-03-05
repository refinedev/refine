import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import {
    CompanyList,
    CompanyShow,
    CompanyCreate,
    CompanyEdit,
} from "./pages/companies";
import { JobList, JobCreate, JobEdit } from "pages/jobs";

const App: React.FC = () => {
    const API_URL = "http://localhost:3000";
    const dataProvider = nestjsxCrudDataProvider(API_URL);

    return (
        <Refine
            legacyRouterProvider={{
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
