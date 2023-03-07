import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import { Layout } from "components/Layout";
import "index.css";
import { CategoryCreate } from "pages/category/create";
import { CategoryList } from "pages/category/list";

function App() {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "categories",
                    create: CategoryCreate,
                    list: CategoryList,
                },
            ]}
            Layout={({ children }) => <Layout> {children}</Layout>}
        />
    );
}

export default App;
