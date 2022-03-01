---
id: search
title: Search
---

import search from '@site/static/img/guides-and-concepts/search/search.gif';

We will create a `<Header>` component for your application with Ant Design's [`<AutoComplete>`](https://ant.design/components/auto-complete) component.
We will now examine how to search within the application with this component.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={search} alt="search" />
</div>
<br/>

To do this, let's first create our `<Header>` component.

```tsx  title="src/components/header.tsx"
import { AntdLayout, AutoComplete, Input, Icons } from "@pankod/refine-antd";

const { SearchOutlined } = Icons;

export const Header: React.FC = () => {
    return (
        <AntdLayout.Header
            style={{
                padding: "0px 24px",
                backgroundColor: "#FFF",
            }}
        >
            <AutoComplete
                style={{ width: "100%", maxWidth: "550px" }}
                filterOption={false}
            >
                <Input
                    size="large"
                    placeholder="Search posts or categories"
                    suffix={<SearchOutlined />}
                />
            </AutoComplete>
        </AntdLayout.Header>
    );
};
```

We created the `<Header>` component as we want it to appear. We have not done anything for any search process at this stage. We just created the UI.

<br />

:::note
Let's not forget to pass the `<Header>` component to the `<Refine>` component in `App.tsx` as below.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import { Layout, ReadyPage, notificationProvider, ErrorComponent } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine-antd/dist/styles.min.css";

// highlight-next-line
import { Header } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
            // highlight-next-line
            Header={Header}
        />
    );
};

export default App;
```

:::

Now let's get our [`<AutoComplete>`](https://ant.design/components/auto-complete) input ready to search. So, let's fetch our posts according to the value entered in our input.

In order to fetch more than one record, we will use the [`useList`](/core/hooks/data/useList.md) data hook, and we will filter and fetch this data according to the search value.

Before we start, let's create the interfaces of our [`<AutoComplete>`](https://ant.design/components/auto-complete)'s `options` property and the post source.

```ts title="src/interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
}

export interface ICategory {
    id: string;
    title: string;
}

export interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
}

export interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}
```

```tsx title="src/components/header.tsx"
import { useState, useEffect } from "react";
import { useList } from "@pankod/refine-core";
import {
    AntdLayout,
    AutoComplete,
    Input,
    Icons,
    Typography,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";

const { Link } = routerProvider;
const { Text } = Typography;
const { SearchOutlined } = Icons;

import { IOptions, IPost } from "interfaces";

// To be able to customize the option title
const renderTitle = (title: string) => {
    return (
        <Text strong style={{ fontSize: "16px" }}>
            {title}
        </Text>
    );
};

// To be able to customize the option item
const renderItem = (title: string, resource: string, id: string) => {
    return {
        value: title,
        label: (
            <Link to={`/${resource}/show/${id}`}>
                <Text>{title}</Text>
            </Link>
        ),
    };
};

export const Header: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [options, setOptions] = useState<IOptions[]>([]);

    const { refetch: refetchPosts } = useList<IPost>({
        resource: "posts",
        config: {
            filters: [{ field: "title", operator: "contains", value }],
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const postOptionGroup = data.data.map((item) =>
                    renderItem(item.title, "posts", item.id),
                );
                if (postOptionGroup.length > 0) {
                    setOptions([
                        {
                            label: renderTitle("Posts"),
                            options: postOptionGroup,
                        },
                    ]);
                }
            },
        },
    });

    useEffect(() => {
        setOptions([]);
        refetchPosts();
    }, [value]);

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 24px",
                backgroundColor: "#FFF",
            }}
        >
            <AutoComplete
                style={{ width: "100%", maxWidth: "550px" }}
                filterOption={false}
                options={options}
                onSearch={(value: string) => setValue(value)}
            >
                <Input
                    size="large"
                    placeholder="Search posts or categories"
                    suffix={<SearchOutlined />}
                />
            </AutoComplete>
        </AntdLayout.Header>
    );
};
```

We created states to dynamically manage the `value` and `options` properties of the [`<AutoComplete>`](https://ant.design/components/auto-complete) component. The [`useList`](/core/hooks/data/useList.md) hook is triggered whenever the value changes. Likewise, the filter used to fetch the data is updated each time the value changes.

<br />

Search value is currently only searched and fetched inside posts. Let's update our code to search both posts and categories according to search value.

```tsx title="src/components/header.tsx"
...
export const Header: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [options, setOptions] = useState<IOptions[]>([]);

    const { refetch: refetchPosts } = useList<IPost>({
        resource: "posts",
        config: {
            filters: [{ field: "title", operator: "contains", value }],
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const postOptionGroup = data.data.map((item) =>
                    renderItem(item.title, "posts", item.id),
                );
                if (postOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions
                        {
                            label: renderTitle("Posts"),
                            options: postOptionGroup,
                        },
                    ]);
                }
            },
        },
    });

    const { refetch: refetchCategories } = useList<ICategory>({
        resource: "categories",
        config: {
            filters: [{ field: "q", operator: "contains", value }],
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const categoryOptionGroup = data.data.map((item) =>
                    renderItem(item.title, "categories", item.id),
                );
                if (categoryOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Categories"),
                            options: categoryOptionGroup,
                        },
                    ]);
                }
            },
        },
    });

    useEffect(() => {
        setOptions([]);
        refetchPosts();
        refetchCategories();
    }, [value]);

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 24px",
                backgroundColor: "#FFF",
            }}
        >
            ...
        </AntdLayout.Header>
    );
};
```

:::tip
By doing the same implementation on your other resources, you can search more than one resource with a value.
:::

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-search-example-jzrlp?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-search-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
