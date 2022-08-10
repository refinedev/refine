---
id: create
title: Create
---

import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/create/pageHeaderPropsUsage.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/create/actionButtonsUsage.png'

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/create
const { Create, Form, Input, Select, useForm, useSelect, CreateButton } =
    RefineAntd;

interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

// visible-block-start
// import { Create, Form, Input, Select, useForm, useSelect } from "@pankod/refine-antd";

const PostCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return <Create title="Custom Title">...</Create>;
};
```

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/ui-frameworks/antd/components/buttons/save.md)

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return <Create saveButtonProps={{ size: "small" }}>...</Create>;
};
```

### `resource`

The `<Create>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Create>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { Create } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const CustomPage = () => {
    return <Create resource="posts">...</Create>;
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ],
                // highlight-end
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev/")}
            resources={[{ name: "posts" }]}
        />
    );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx
import { Create } from "@pankod/refine-antd";
import { MyBackIcon } from "@components/icons";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            goBack={<MyBackIcon />}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `isLoading`

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
            /* ... */
            isLoading={loading}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-antd` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/ui-frameworks/antd/components/breadcrumb.md)

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            breadcrumb={null}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `wrapperProps`

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property. For `@pankod/refine-antd` wrapper elements are simple `<div/>`s and `wrapperProps` can get every attribute that `<div/>` can get.

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            wrapperProps={{
                style: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `headerProps`

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

[Refer to the `PageHeader` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/page-header/)

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            headerProps={{
                style: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `contentProps`

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

[Refer to the `Card` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/card/)

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            contentProps={{
                style: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { Create, Button } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            headerButtonProps={{
                style: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { Create, Button } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            footerButtonProps={{
                style: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Create>` uses the Ant Design [`<Card>`](https://ant.design/components/card) component. The `action` property of the `<Card>` component shows `<SaveButton>` and `<DeleteButton>` based on your resource definition in the `resources` property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx
import { Create, Button } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            actionButtons={
                <>
                    <Button type="primary">Custom Button 1</Button>
                    <Button size="small">Custom Button 2</Button>
                </>
            }
        >
            ...
        </Create>
    );
};
```

<br/>
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

`<Create>` uses the Ant Design `<PageHeader>` components so you can customize with the props of `pageHeaderProps`.

By default, the `breadcrumb` property of the `<PageHeader>` component shows [`<Breadcrumb>`][breadcrumb-component] component.

[Refer to the `<PageHeader>` documentation for detailed usage. &#8594](https://ant.design/components/page-header/#API)

```tsx
import { Create, Breadcrumb } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            pageHeaderProps={{
                onBack: () => console.log("Hello, refine"),
                subTitle: "Subtitle",
                breadcrumb: <Breadcrumb breadcrumbProps={{ separator: "-" }} />,
            }}
        >
            ...
        </Create>
    );
};
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

## API Reference

### Properties

| Property                                                                                                     | Description                               | Type                                                                            | Default                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| title                                                                                                        | Adds title                                | `React.ReactNode`                                                               | `"Edit"` prefix and singular of `resource.name`                                                                                |
| saveButtonProps                                                                                              | Adds props for create button              | `{ disabled: boolean; onClick: () => void; loading: boolean; }`                 | `<SaveButton>`                                                                                                                 |
| resource                                                                                                     | Resource name for API data interactions   | `string`                                                                        | Resource name that it reads from the URL.                                                                                      |
| goBack                                                                                                       | Custom back icon element                  | `React.ReactNode`                                                               | `<ArrowLeft />`                                                                                                                |
| isLoading                                                                                                    | Loading state of the component            | `boolean`                                                                       | `false`                                                                                                                        |
| breadcrumb                                                                                                   | Custom breadcrumb element                 | `React.ReactNode`                                                               | `<Breadcrumb/>`                                                                                                                |
| wrapperProps                                                                                                 | Wrapper element props                     | `React.DetailedHTMLProps<HTMLDivElement>`                                       |                                                                                                                                |
| headerProps                                                                                                  | Header element props                      | `PageHeaderProps`                                                               |                                                                                                                                |
| contentProps                                                                                                 | Content wrapper element props             | `CardProps`                                                                     |                                                                                                                                |
| headerButtons                                                                                                | Header buttons element or render function | `({ defaultButtons: React.ReactNode }) => React.ReactNode` \| `React.ReactNode` |                                                                                                                                |
| headerButtonProps                                                                                            | Header buttons wrapper element props      | `SpaceProps`                                                                    |                                                                                                                                |
| footerButtons                                                                                                | Footer buttons element or render function | `({ defaultButtons: React.ReactNode }) => React.ReactNode` \| `React.ReactNode` |                                                                                                                                |
| footerButtonProps                                                                                            | Footer buttons wrapper element props      | `SpaceProps`                                                                    |                                                                                                                                |
| <div className="required-block"><div>actionButtons</div> <div className=" required">deprecated</div></div>   | Passes the props for `<PageHeader>`       | `React.ReactNode`                                                               | `<SaveButton>` and depending on your resource configuration (`canDelete` prop)                                                 |
| <div className="required-block"><div>pageHeaderProps</div> <div className=" required">deprecated</div></div> | Passes the props for `<PageHeader>`       | [PageHeaderProps](https://ant.design/components/page-header/#API)               | { ghost: false, [title](#title), extra: `<ListButton>` and `<RefreshButton>`, breadcrumb: [Breadcrumb][breadcrumb-component] } |

[breadcrumb-component]: /ui-frameworks/antd/components/breadcrumb.md
