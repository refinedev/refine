---
id: quickstart
title: Quick Start Guide
---

The fastest way to get started with **refine** is using the [superplate](https://github.com/pankod/superplate) project starter tool.
Run the following command to create a new **refine** project

```
npx superplate-cli -p refine-react my-project
```

Select the following options to complete CLI wizard:

```
? Do you want to use a UI Framework?:
❯ Ant Design

? Do you want a customized theme?:
❯ Default theme

? Router Provider:
❯ React Router v6

? Data Provider:
❯ REST API

? Auth Provider:
❯ None

? Do you want to add example pages? 
❯ No

? Do you want a customized layout?
❯ No
```

:::note
 You can free to choose the rest of the options as you wish.
:::


Once the setup is complete, navigate to the project folder and start your project with:

```
npm run dev
```

Your **refine** application will be accessible at [http://localhost:3000](http://localhost:3000):
![Welcome on board](https://github.com/refinedev/refine/blob/master/documentation/static/img/welcome-on-board.png?raw=true)
Let's consume a public `fake REST API` and add two resources (*posts*, *categories*) to our project. Replace the contents of `src/App.tsx` with the following code:

```tsx title="src/App.tsx"

import { Refine, useMany } from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    DateField,
    Layout,
    ReadyPage,
    notificationProvider,
    ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine-antd/dist/styles.min.css";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts", list: PostList }]}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
        />
    );
};

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <List>
            <Table<IPost> {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value: number) => {
                        if (isLoading) {
                            return "loading...";
                        }

                        return data?.data.find(
                            (item: ICategory) => item.id === value,
                        )?.title;
                    }}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
            </Table>
        </List>
    );
};

export default App;

interface IPost {
  title: string;
  createdAt: string;
  category: { id: number };
}

interface ICategory {
  id: number;
  title: string;
}

```

Now, you should see the output as a table populated with `post` & `category` data:
![First example result](https://github.com/refinedev/refine/blob/master/documentation/static/img/first-example-result.png?raw=true)

## Next Steps

👉 Jump to [Refine - Ant Design Tutorial](https://refine.dev/docs/ui-frameworks/antd/tutorial/) to continue your work and turn the example into a full-blown CRUD application.

👉 Check out the [Refine - Tailwind Tutorial](https://refine.dev/docs/ui-frameworks/antd/tutorial/) to learn how to use **refine** in a pure *headless* way.

👉 Read more on [Advanced Tutorials
](https://refine.dev/docs/advanced-tutorials/) for different usage scenarios.

👉 See the real-life [Finefoods Demo](https://refine.dev/demo/) project.

👉 Play with interactive [Examples](https://refine.dev/docs/examples/)
