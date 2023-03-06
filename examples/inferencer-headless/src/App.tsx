import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import "./App.css";

import { HeadlessInferencer } from "@refinedev/inferencer/headless";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            legacyRouterProvider={routerProvider}
            resources={[
                {
                    name: "samples",
                    list: HeadlessInferencer,
                    edit: HeadlessInferencer,
                    show: HeadlessInferencer,
                    create: HeadlessInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                    list: HeadlessInferencer,
                    edit: HeadlessInferencer,
                    show: HeadlessInferencer,
                    create: HeadlessInferencer,
                    canDelete: true,
                },
                {
                    name: "users",
                    list: HeadlessInferencer,
                    edit: HeadlessInferencer,
                    show: HeadlessInferencer,
                    create: HeadlessInferencer,
                    canDelete: true,
                },
            ]}
        />
    );
};

export default App;
