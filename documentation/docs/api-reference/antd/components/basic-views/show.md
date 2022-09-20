---
id: show
title: Show
---

import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/show/pageHeaderPropsUsage.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/show/actionButtonsUsage.png'
import isLoading from '@site/static/img/guides-and-concepts/basic-views/show/isLoading.png'

`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page.

We will show what `<Show>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/show/2
const { Show, Typography, MarkdownField } = RefineAntd;
const { useShow, IResourceComponentsProps, useOne } = RefineCore;
// visible-block-start
import { Show, Typography, MarkdownField } from "@pankod/refine-antd";

const { Title, Text } = Typography;

const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } =
        useOne<ICategory>({
            resource: "categories",
            id: record?.category.id || "",
            queryOptions: {
                enabled: !!record,
            },
        });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Category</Title>
            <Text>
                {categoryIsLoading ? "Loading..." : categoryData?.data.title}
            </Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton recordItemId="2">Edit Item 2</ShowButton>
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

## Properties

### `title`

It allows adding a title for the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Show post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, Form, Input, Select, useForm, useSelect, ShowButton } =
    RefineAntd;
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
    ...dataProvider,
    deleteOne: async ({ resource, id, variables }) => {
        return {
            data: {},
        };
    },
};

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show title="Custom Title">
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton recordItemId="2">Show Item 2</ShowButton>
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `resource`

The `<Show>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Show>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom/2
const { Show } = RefineAntd;
const { Refine } = RefineCore;
const routerProvider = RefineDemoReactRouterV6(["/custom/2"]);
const dataProvider = RefineSimpleRest.default;

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Show } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show resource="posts">
            <p>Rest of your page here</p>
        </Show>
    );
};

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom/:id",
                    },
                ],
                // highlight-end
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end

render(<App />);
```

### `canDelete` and `canEdit`

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property refine adds the buttons by default.

When clicked on, delete button executes the `useDelete` method provided by the [`dataProvider`](/core/providers/data-provider.md) and the edit button redirects the user to the record edit page.

Refer to the [`<DeleteButton>`](/ui-frameworks/antd/components/buttons/delete.md) and the [`<EditButton>`](/ui-frameworks/antd/components/buttons/edit.md) documentation for detailed usage.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, Form, Input, Select, useForm, useSelect, ShowButton, Edit } =
    RefineAntd;
const { usePermissions } = RefineCore;

const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
    ...dataProvider,
    deleteOne: async ({ resource, id, variables }) => {
        return {
            data: {},
        };
    },
};

const authProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve("admin"),
    getUserIdentity: () => Promise.resolve(),
};

// visible-block-start
import { Show } from "@pankod/refine-antd";
import { usePermissions } from "@pankod/refine-core";

const PostShow: React.FC = () => {
    const { data: permissionsData } = usePermissions();
    return (
        <Show
            /* highlight-start */
            canDelete={permissionsData?.includes("admin")}
            canEdit={permissionsData?.includes("admin")}
            /* highlight-end */
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        authProvider={authProvider}
        dataProvider={customDataProvider}
        initialRoutes={["/posts/show/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton>Show Item 2</ShowButton>
                    </div>
                ),
                show: PostShow,
                edit: () => {
                    return <Edit>Edit Page</Edit>;
                },
            },
        ]}
    />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/hooks/auth/usePermissions.md)

### `recordItemId`

`<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const {
    Show,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
    ShowButton,
    useModalForm,
    Modal,
    Button,
} = RefineAntd;

// visible-block-start
import { Show, useModalForm, Modal, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    const { modalProps, id, show } = useModalForm({
        action: "show",
    });

    return (
        <div>
            <Button onClick={() => show()}>Show Button</Button>
            <Modal {...modalProps}>
                {/* highlight-next-line */}
                <Show recordItemId={id}>
                    <p>Rest of your page here</p>
                </Show>
            </Modal>
        </div>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton recordItemId="2">Show Item 2</ShowButton>
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

:::note
`<Show>` component needs the `id` information for `<RefreshButton>` to work properly.
:::

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Show } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostShow = () => {
    return <Show dataProviderName="other">...</Show>;
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            // highlight-start
            dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev/"),
                other: dataProvider("https://other-api.fake-rest.refine.dev/"),
            }}
            // highlight-end
            resources={[{ name: "posts", show: PostShow }]}
        />
    );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, Icons, ShowButton } = RefineAntd;

// visible-block-start
import { Show, Icons } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show goBack={<Icons.SmileOutlined />}>
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts", "/posts/show/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton>Show Item 2</ShowButton>
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `isLoading`

Since `<Show>` uses the Ant Design [`<Card>`](https://ant.design/components/card/) component, the `isLoading` property can be set like the below.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show isLoading={true}>
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-antd` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/ui-frameworks/antd/components/breadcrumb.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, ShowButton, Breadcrumb } = RefineAntd;

// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            breadcrumb={
                <div
                    style={{
                        padding: "3px 6px",
                        border: "2px dashed cornflowerblue",
                    }}
                >
                    <Breadcrumb />
                </div>
            }
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property. For `@pankod/refine-antd` wrapper elements are simple `<div/>`s and `wrapperProps` can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            wrapperProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `headerProps`

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

[Refer to the `PageHeader` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/page-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            headerProps={{
                subTitle: "This is a subtitle",
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `contentProps`

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

[Refer to the `Card` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            contentProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, ShowButton, Button } = RefineAntd;

// visible-block-start
import { Show, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { Show, ShowButton, Button } = RefineAntd;

// visible-block-start
import { Show, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            headerButtonProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
            headerButtons={<Button type="primary">Custom Button</Button>}
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, ShowButton, Button } = RefineAntd;

// visible-block-start
import { Show, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-start
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { Show, ShowButton, Button } = RefineAntd;

// visible-block-start
import { Show, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
    return (
        <Show
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-start
            footerButtonProps={{
                style: {
                    // hide-start
                    float: "right",
                    marginRight: 24,
                    // hide-end
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <ShowButton />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Show>` uses the Ant Design [`<Card>`](https://ant.design/components/card/) component so you can customize the `action` property with the properties of `actionButtons`. By default, the `action` property of the `<Card>` component shows nothing in the `<Show>` component.

```tsx
import { Show, Space, Button } from "@pankod/refine-antd";

export const ShowPage: React.FC = () => {
    return (
        <Show
            actionButtons={
                <Space>
                    <Button type="primary">Custom Button 1</Button>
                    <Button type="default">Custom Button 2</Button>
                </Space>
            }
        >
            ...
        </Show>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={actionButtonsUsage} alt="actionButton Usage" />
</div>
<br/>

### ~~`pageHeaderProps`~~

:::caution Deprecated
Use `headerProps`, `wrapperProps` or `contentProps` instead.
:::

`<Show>` uses the Ant Design [`<PageHeader>`](https://ant.design/components/page-header/#API) components so you can customize it with the properties of `pageHeaderProps`.

By default, the `extra` property of the `<PageHeader>` component shows `<RefreshButton>`, `<ListButton>`, `<EditButton>` and `<DeleteButton>` based on your resource definition in the `resources` property you pass to `<Refine>` and the `breadcrumb` property shows [`<Breadcrumb>`][breadcrumb-component] component.

```tsx
import { Show } from "@pankod/refine-antd";

export const ShowPage: React.FC = () => {
    return (
        <Show
            pageHeaderProps={{
                onBack: () => console.log("Hello, refine"),
                subTitle: "Subtitle",
            }}
        >
            ...
        </Show>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

:::caution
The `<Show>` component needs the `id` information for work properly, so if you use the `<Show>` component in custom pages, you should pass the `recordItemId` property.
:::

## API Reference

### Properties

| Property                                                                                                     | Description                                                       | Type                                                                            | Default                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| title                                                                                                        | Adds a title                                                      | `React.ReactNode`                                                               | `"Show"` prefix and singular of `resource.name`                                                                                |
| resource                                                                                                     | Resource name for API data interactions                           | `string`                                                                        | Resource name that it reads from the URL.                                                                                      |
| canDelete                                                                                                    | Adds a delete button                                              | `boolean`                                                                       | If the resource has `canDelete` prop it is `true` else `false`                                                                 |
| canEdit                                                                                                      | Adds an edit button                                               | `boolean`                                                                       | If the resource has `canEdit` prop it is `true` else `false`                                                                   |
| recordItemId                                                                                                 | The record id for `<RefreshButton>`                               | [`BaseKey`](/core/interfaces.md#basekey)                                        |                                                                                                                                |
| dataProviderName                                                                                             | To specify a data provider other than `default` use this property | `string`                                                                        |                                                                                                                                |
| goBack                                                                                                       | Custom back icon element                                          | `React.ReactNode`                                                               | `<ArrowLeft />`                                                                                                                |
| isLoading                                                                                                    | Gets passed to the `loading` prop of the `<Card>`                 | `boolean`                                                                       | `false`                                                                                                                        |
| breadcrumb                                                                                                   | Custom breadcrumb element                                         | `React.ReactNode`                                                               | `<Breadcrumb/>`                                                                                                                |
| wrapperProps                                                                                                 | Wrapper element props                                             | `React.DetailedHTMLProps<HTMLDivElement>`                                       |                                                                                                                                |
| headerProps                                                                                                  | Header element props                                              | `PageHeaderProps`                                                               |                                                                                                                                |
| contentProps                                                                                                 | Content wrapper element props                                     | `CardProps`                                                                     |                                                                                                                                |
| headerButtons                                                                                                | Header buttons element or render function                         | `({ defaultButtons: React.ReactNode }) => React.ReactNode` \| `React.ReactNode` |                                                                                                                                |
| headerButtonProps                                                                                            | Header buttons wrapper element props                              | `SpaceProps`                                                                    |                                                                                                                                |
| footerButtons                                                                                                | Footer buttons element or render function                         | `({ defaultButtons: React.ReactNode }) => React.ReactNode` \| `React.ReactNode` |                                                                                                                                |
| footerButtonProps                                                                                            | Footer buttons wrapper element props                              | `SpaceProps`                                                                    |                                                                                                                                |
| <div className="required-block"><div>actionButtons</div> <div className=" required">deprecated</div></div>   | Gets passed to the `extra` prop of the `<Card>`                   | `React.ReactNode`                                                               | `<SaveButton>` and depending on your resource configuration (`canDelete` prop)                                                 |
| <div className="required-block"><div>pageHeaderProps</div> <div className=" required">deprecated</div></div> | Passes props for `<PageHeader>`                                   | [PageHeaderProps](https://ant.design/components/page-header/#API)               | { ghost: false, [title](#title), extra: `<ListButton>` and `<RefreshButton>`, breadcrumb: [Breadcrumb][breadcrumb-component] } |

[breadcrumb-component]: /ui-frameworks/antd/components/breadcrumb.md
