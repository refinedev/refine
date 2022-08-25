import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostList, PostCreate, PostEdit } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            auditLogProvider={{
                get: async ({ resource, meta }) => {
                    const { data } = await dataProvider(API_URL).getList({
                        resource: "logs",
                        filters: [
                            {
                                field: "resource",
                                operator: "eq",
                                value: resource,
                            },
                            {
                                field: "meta.id",
                                operator: "eq",
                                value: meta?.id,
                            },
                        ],
                    });

                    return data;
                },
                create: (params) => {
                    return dataProvider(API_URL).create({
                        resource: "logs",
                        variables: params,
                    });
                },
                update: async ({ id, name }) => {
                    const { data } = await dataProvider(API_URL).update({
                        resource: "logs",
                        id,
                        variables: { name },
                    });
                    return data;
                },
            }}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    canDelete: true,
                },
            ]}
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
