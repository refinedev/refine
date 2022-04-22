---
id: list-search
title: List Search
---

import basicList from '@site/static/img/guides-and-concepts/list-search/basic-list.png';
import formList from '@site/static/img/guides-and-concepts/list-search/form-list.png';

We will examine how to make an extensive search and filtering with the [`useSimpleList`](/ui-frameworks/antd/hooks/list/useSimpleList.md) hook that works with the Ant Design's [`<List>`](https://ant.design/components/list) component.

To do this, let's list posts using the posts resource.

```tsx title="pages/posts/list.tsx"
import { 
    // highlight-next-line
    useMany 
} from "@pankod/refine-core";
import {
    List,
    // highlight-start
    useSimpleList,
    // highlight-end
    AntdList,
    Typography,
    Space,
    NumberField,
} from "@pankod/refine-antd";

const { Text } = Typography;

export const PostList: React.FC = () => {
    // highlight-start
    const { listProps } = useSimpleList<IPost>();

    const categoryIds =
        listProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });
    // highlight-end

    const renderItem = (item: IPost) => {
        const { title, hit, content } = item;

        const categoryTitle = data?.data.find(
            (category: ICategory) => category.id === item.category.id,
        )?.title;

        return (
            <AntdList.Item
                actions={[
                    <Space key={item.id} direction="vertical" align="end">
                        <NumberField
                            value={hit}
                            options={{
                                notation: "compact",
                            }}
                        />
                        <Text>{categoryTitle}</Text>
                    </Space>,
                ]}
            >
                <AntdList.Item.Meta title={title} description={content} />
            </AntdList.Item>
        );
    };

    return (
        <List>
            // highlight-next-line
            <AntdList {...listProps} renderItem={renderItem} />
        </List>
    );
};

interface ICategory {
    id: string;
    title: string;
}

interface IPost {
    id: string;
    title: string;
    content: string;
    hit: number;
    category: ICategory;
}
```

After creating the `<PostList>` component, add it to resource with `list` prop:

```tsx
import { Refine } from "@pankod/refine-core";
import { Layout, ReadyPage, notificationProvider, ErrorComponent } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine-antd/dist/styles.min.css";

// highlight-next-line
import { PostList } from "pages/posts";

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
            // highlight-start
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
            //highlight-end
        />
    );
};

export default App;
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={basicList} alt="basic list" />
</div>
<br />

We will create a form by extracting `searchFormProps` from [`useSimpleList`](/ui-frameworks/antd/hooks/list/useSimpleList.md). We will use this form for search/filtering. We will also create an interface to determine the types of values from the form.

```tsx title="pages/posts/list.tsx"
...

import {
    ...
// highlight-next-line
    CrudFilters,
} from "@pankod/refine-core";

export const PostList: React.FC = () => {
// highlight-start
    const { listProps, searchFormProps } = useSimpleList<
        IPost,
        IPostFilterVariables
    >({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { category, createdAt } = params;

            filters.push(
                {
                    field: "category.id",
                    operator: "eq",
                    value: category,
                },
                {
                    field: "createdAt",
                    operator: "gte",
                    value: createdAt ? createdAt[0].toISOString() : undefined,
                },
                {
                    field: "createdAt",
                    operator: "lte",
                    value: createdAt ? createdAt[1].toISOString() : undefined,
                },
            );

            return filters;
        },
    });
// highlight-end

    // ...

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
// highlight-start
            <Form
                {...searchFormProps}
                layout="vertical"
                onValuesChange={() => searchFormProps.form?.submit()}
            >
                <Space wrap>
                    <Form.Item label="Category" name="category">
                        <Select
                            {...categorySelectProps}
                            allowClear
                            placeholder="Search Categories"
                        />
                    </Form.Item>
                    <Form.Item label="Created At" name="createdAt">
                        <RangePicker />
                    </Form.Item>
                </Space>
            </Form>
            <AntdList {...listProps} renderItem={renderItem} />
// highlight-end
        </List>
    );
};

interface IPostFilterVariables {
    category: string;
    createdAt: [Dayjs, Dayjs];
}
```

When the form is submitted, the `onSearch` method runs and we get the search form values. Then the `listProps` is refreshed according to the criteria.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={formList} alt="form list" />
</div>

<br />

:::important
[`CrudFilters`](/core/interfaces.md#crudfilters) type object has `field`, `operator` and `value` properties. These properties help us to filter in which field, with which operator, and with which data.
:::

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-use-simple-list-example-zm51o?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-use-simple-list-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
