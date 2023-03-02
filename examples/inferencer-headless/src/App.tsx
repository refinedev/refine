import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import "./App.css";

import { HeadlessInferencer } from "@pankod/refine-inferencer/headless";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
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
