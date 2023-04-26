---
id: faq
title: FAQ
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

<Tabs
defaultValue="core"
values={[
{label: 'Core Form', value: 'core'},
{label: 'Ant Design Form', value: 'antd'},
{label: 'React Hook Form', value: 'react-hook-form'},
{label: 'Material UI + React Hook Form', value: 'mui-react-hook-form'},
{label: 'Chakra UI + React Hook Form', value: 'chakra-ui-react-hook-form'}
]}>
<TabItem value="core">

[Refer to the `useForm` documentation for more information. &#8594][use-form-core]

```tsx
import React, { useState } from "react";
import { useForm } from "@refinedev/core";

export const UserCreate: React.FC = () => {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();

    const { onFinish } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        const fullName = `${name} ${surname}`;
        onFinish({
            fullName: fullName,
            name,
            surname,
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <input onChange={(e) => setName(e.target.value)} />
            <input onChange={(e) => setSurname(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};
```

</TabItem>
<TabItem value="antd">

[Refer to the `useForm` documentation for more information. &#8594][use-form-antd]

```tsx
import React from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const UserCreate: React.FC = () => {
    const { formProps } = useForm();

    return (
        <Form
            {...formProps}
            onFinish={(values) => {
                const { name, surname } = values;
                const fullName = `${name} ${surname}`;

                return (
                    formProps.onFinish &&
                    formProps.onFinish({
                        ...values,
                        fullName,
                    })
                );
            }}
        >
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Surname" name="surname">
                <Input />
            </Form.Item>
        </Form>
    );
};
```

</TabItem>
<TabItem value="react-hook-form">

[Refer to the `useForm` documentation for more information. &#8594][use-form-react-hook-form]

```tsx
import React from "react";
import { useForm } from "@refinedev/react-hook-form";

export const UserCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const handleSubmitPostCreate = (values) => {
        const { name, surname } = values;
        const fullName = `${name} ${surname}`;
        onFinish({
            ...value,
            fullName,
        });
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitPostCreate)}>
            <input {...register("name")} />
            <input {...register("surname")} />
        </form>
    );
};
```

</TabItem>

<TabItem value="mui-react-hook-form">

[Refer to the `useForm` documentation for more information. &#8594][use-form-react-hook-form]

```tsx
import React from "react";
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Button, Box, TextField } from "@mui/material";

type FormValues = {
    name: string;
    surname: string;
};

export const UserCreate: React.FC = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
    } = useForm<FormValues, HttpError, FormValues>();

    const handleSubmitPostCreate = (values: FormValues) => {
        const { name, surname } = values;
        const fullName = `${name} ${surname}`;
        onFinish({
            ...value,
            fullName,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit(handleSubmitPostCreate)}>
            <TextField
                {...register("name", {
                    required: "This field is required",
                })}
                name="name"
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <TextField
                {...register("surname", {
                    required: "This field is required",
                })}
                name="surname"
                label="Surname"
                error={!!errors.surname}
                helperText={errors.surname?.message}
            />
            <Button type="submit">Submit</Button>
        </Box>
    );
};
```

If you use [`<Create>`](/docs/api-reference/mui/components/basic-views/create/#savebuttonprops) component, you can override the [`saveButtonProps`](/docs/packages/documentation/react-hook-form/useForm/#savebuttonprops) prop to modify the form data before submitting it to the API.

```tsx
import React from "react";
import { HttpError } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Button, Box, TextField } from "@mui/material";

type FormValues = {
    name: string;
    surname: string;
};

export const UserCreate: React.FC = () => {
    const {
        saveButtonProps,
        refineCore: { onFinish },
        handleSubmit,
    } = useForm<FormValues, HttpError, FormValues>();

    const handleSubmitPostCreate = (values: FormValues) => {
        const { name, surname } = values;
        const fullName = `${name} ${surname}`;
        onFinish({
            ...value,
            fullName,
        });
    };

    return (
        <Create
            saveButtonProps={{
                ...saveButtonProps,
                onClick: handleSubmit(handleSubmitForm),
            }}
        >
            <Box component="form">
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    name="name"
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    {...register("surname", {
                        required: "This field is required",
                    })}
                    name="surname"
                    label="Surname"
                    error={!!errors.surname}
                    helperText={errors.surname?.message}
                />
            </Box>
        </Create>
    );
};
```

</TabItem>

<TabItem value="chakra-ui-react-hook-form">

[Refer to the `useForm` documentation for more information. &#8594][use-form-react-hook-form]

```tsx
import React from "react";
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";

type FormValues = {
    name: string;
    surname: string;
};

export const UserCreate: React.FC = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
    } = useForm<FormValues, HttpError, FormValues>();

    const handleSubmitPostCreate = (values: FormValues) => {
        const { name, surname } = values;
        const fullName = `${name} ${surname}`;
        onFinish({
            ...value,
            fullName,
        });
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitPostCreate)}>
            <FormControl mb="3" isInvalid={!!errors?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                />
                <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.surname}>
                <FormLabel>Surname</FormLabel>
                <Input
                    id="surname"
                    type="text"
                    {...register("surname", {
                        required: "Surname is required",
                    })}
                />
                <FormErrorMessage>
                    {`${errors.title?.surname}`}
                </FormErrorMessage>
                <Button type="submit">Submit</Button>
            </FormControl>
        </form>
    );
};
```

If you use [`<Create>`](/docs/api-reference/chakra-ui/components/basic-views/create/#savebuttonprops) component, you can override the [`saveButtonProps`](/docs/packages/documentation/react-hook-form/useForm/#savebuttonprops) prop to modify the form data before submitting it to the API.

```tsx
import React from "react";
import { HttpError } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import { useForm } from "@refinedev/react-hook-form";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";

type FormValues = {
    name: string;
    surname: string;
};

export const UserCreate: React.FC = () => {
    const {
        saveButtonProps,
        refineCore: { onFinish },
        handleSubmit,
    } = useForm<FormValues, HttpError, FormValues>();

    const handleSubmitPostCreate = (values: FormValues) => {
        const { name, surname } = values;
        const fullName = `${name} ${surname}`;
        onFinish({
            ...value,
            fullName,
        });
    };

    return (
        <Create
            saveButtonProps={{
                ...saveButtonProps,
                onClick: handleSubmit(handleSubmitForm),
            }}
        >
            <form>
                <FormControl mb="3" isInvalid={!!errors?.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        id="name"
                        type="text"
                        {...register("name", { required: "Name is required" })}
                    />
                    <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
                </FormControl>
                <FormControl mb="3" isInvalid={!!errors?.surname}>
                    <FormLabel>Surname</FormLabel>
                    <Input
                        id="surname"
                        type="text"
                        {...register("surname", {
                            required: "Surname is required",
                        })}
                    />
                    <FormErrorMessage>
                        {`${errors.title?.surname}`}
                    </FormErrorMessage>
                </FormControl>
            </form>
        </Create>
    );
};
```

</TabItem>
</Tabs>

## How can I refetch data?

**Refine** automatically invalidates the affected resources after mutations. However, in some cases you may want to refetch manually.

<Tabs
defaultValue="refetch"
values={[
{label: 'React Query Refetch', value: 'refetch'},
{label: 'useInvalidate Hook', value: 'useinvalidate'},
]}>
<TabItem value="refetch">

```tsx
import { useTable, useForm, useShow } from "@refinedev/core";

// All "data" related hooks provided by Refine can use queryResult' refetch function
const { tableQueryResult: { refetch } } = useTable();
const { queryResult: { refetch } } = useForm();
...
...
const { queryResult: { refetch } } = useShow();
...
...
```

</TabItem>
<TabItem value="useinvalidate">

```tsx
import { useInvalidate } from "@refinedev/core";

const invalidate = useInvalidate();

// To invalidate the list and many states of the Posts resource
invalidate({
    resource: "posts",
    invalidates: ["list", "many"],
});

// To invalidate the state of a Posts with an id of 1
invalidate({
    resource: "posts",
    invalidates: ["detail"],
    id: 1,
});

// To invalidate the list and many states of the Posts resource of the dataProvider named "second-data-provider"
invalidate({
    resource: "posts",
    dataProviderName: "second-data-provider",
    invalidates: ["list"],
});

// To invalidate all states of dataprovider named "second-data-provider"
invalidate({
    dataProviderName: "second-data-provider",
    invalidates: ["all"],
});
```

[Refer to the **refine** useInvalidate hook documentation for more information. →](/docs/api-reference/core/hooks/invalidate/useInvalidate)

</TabItem>
</Tabs>

## How can I request an API with nested route?

**Refine**'s way of doing this is with the `resource` property on all data hooks. You can think of the `resource` property as the URL.

For example, If you want to make a request of the URL `/user/1/posts`.

```tsx
import { useTable, useOne } from "@refinedev/core";

useTable({
    resource: "/users/1/posts",
});
```

## How can I ensure a query is only run after a certain variable is available and not on load?

Note that `data` related hooks (`useMany`, `useOne`, etc.) can also accept all `useQuery` options, which allows you to implement dependent queries whereby a query is only run after a certain data is available. This is particularly useful if you want `useMany` to only run after a certain data is available and not on load.

[Refer to react-query docs on **dependent queries** for more information → ](https://react-query.tanstack.com/guides/dependent-queries)

-   Suppose you want this query to run after `categoryIds` is fetched by a preceding query, you can set `enabled` to `categoryIds.length > 0`. This will ensure that `useMany` is only run after `categoryIds` is fetched.

```tsx
useMany({
    resource: "categories",
    ids: categoryIds,
    // highlight-next-line
    queryOptions: { enabled: categoryIds.length > 0 },
});
```

## Can I work with JavaScript?

**Yes!** You can work with JavaScript!

[Refer to **Refine JavaScript** example → ](https://github.com/refinedev/refine/tree/master/examples/with-javascript)

## How I can override specific function of Data Providers?

In some cases, you may need to override functions of Refine data providers. The simplest way to do this is to use the [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

For example, Let's override the `update` function of the [`@refinedev/simple-rest`](https://github.com/refinedev/refine/tree/next/packages/simple-rest). `@refinedev/simple-rest` uses the `PATCH` HTTP method for `update`, let's change it to `PUT` without forking the whole data provider.

```tsx
import dataProvider from "@refinedev/simple-rest";

const simpleRestProvider = dataProvider("API_URL");
const myDataProvider = {
    ...simpleRestProvider,
    update: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.put(url, variables);

        return {
            data,
        };
    },
};

<Refine dataProvider={myDataProvider} />;
```

What if we want to select `PUT` or `PATCH` on a request basis?

💥 We can use `meta` for this. Remember, `meta` can be used in all `data`, `form` and `table` hooks

```tsx
// PATCH Request
useUpdate({
    resource: "this-is-patch",
    id: 1,
    variables: {
        foo: "bar",
    },
    meta: {
        httpMethod: "patch",
    },
});

// PUT Request
useUpdate({
    resource: "this-is-put",
    id: 1,
    variables: {
        foo: "bar",
    },
    meta: {
        httpMethod: "put",
    },
});

const simpleRestProvider = dataProvider("API_URL");
const myDataProvider = {
    ...simpleRestProvider,
    update: async ({ resource, id, variables, meta }) => {
        const method = meta.httpMethod ?? "patch";

        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient[method](url, variables);

        return {
            data,
        };
    },
};
```

## Why are API calls triggering twice

This is the expected behavior if you use [`<React.StrictMode>`][react-strict-mode]. In this mode, React will render the components twice in development mode to identify unsafe life cycles, unexpected side effects, and legacy or deprecated APIs. It's used for highlighting possible problems.

:::caution note

[`<React.StrictMode>`][react-strict-mode] checks are run in development mode only; they do not impact the production build.

:::

> Refer to [`<React.StrictMode>` documentation][react-strict-mode] for more information. &#8594

> Refer to [TanStack Query issue](https://github.com/TanStack/query/issues/3633) for more information. &#8594

[react-strict-mode]: https://beta.reactjs.org/reference/react/StrictMode

## How can I add an item to the Sider component?

There are three ways to add an extra navigation link to the sider.

The first and simplest way is to use the `resources` property on the `<Refine>` component. The `<Sider>` component shows the resources whose `list` property is set. So, you can have an extra navigation link by adding a resource with the `list` attribute.

```tsx
import { Refine } from "@refinedev/core";

<Refine
    ...
    resources={[
        {
            name: "dashboard",
            list: "/",
            meta: {
                label: "Dashboard",
                icon: "🏠",
            },
        },
    ]}
/>;
```

<br/>

The second way is to use the `render` property of the `<Sider>` component. The `render` property is a function that receives an object with the `items` and `logout` properties. The `items` property is the list of navigation items and the `logout` property is the logout button.

<Tabs
defaultValue="antd"
values={[
{label: 'Ant Design', value: 'antd'},
{label: 'Material UI', value: 'mui'},
{label: 'Mantine', value: 'mantine'},
{label: 'Chakra UI', value: 'chakra-ui'},
]}>
<TabItem value="antd">

```tsx
import { Layout, Sider } from "@refinedev/antd";

const CustomSider = () => {
    return (
        <Sider
            render={({ items, logout }) => {
                return (
                    <>
                        <a href="https://refine.dev/">👋 Navigation Link</a>
                        {items}
                        {logout}
                    </>
                );
            }}
        />
    );
};

const CustomLayout = () => {
    return <Layout Sider={CustomSider}>...</Layout>;
};
```

</TabItem>
<TabItem value="mui">

```tsx
import { Layout, Sider } from "@refinedev/mui";

const CustomSider = () => {
    return (
        <Sider
            render={({ items, logout }) => {
                return (
                    <>
                        <a href="https://refine.dev/">👋 Navigation Link</a>
                        {items}
                        {logout}
                    </>
                );
            }}
        />
    );
};

const CustomLayout = () => {
    return <Layout Sider={CustomSider}>...</Layout>;
};
```

</TabItem>
<TabItem value="mantine">

```tsx
import { Layout, Sider } from "@refinedev/mantine";

const CustomSider = () => {
    return (
        <Sider
            render={({ items, logout }) => {
                return (
                    <>
                        <a href="https://refine.dev/">👋 Navigation Link</a>
                        {items}
                        {logout}
                    </>
                );
            }}
        />
    );
};

const CustomLayout = () => {
    return <Layout Sider={CustomSider}>...</Layout>;
};
```

</TabItem>
<TabItem value="chakra-ui">

```tsx
import { Layout, Sider } from "@refinedev/chakra-ui";

const CustomSider = () => {
    return (
        <Sider
            render={({ items, logout }) => {
                return (
                    <>
                        <a href="https://refine.dev/">👋 Navigation Link</a>
                        {items}
                        {logout}
                    </>
                );
            }}
        />
    );
};

const CustomLayout = () => {
    return <Layout Sider={CustomSider}>...</Layout>;
};
```

</TabItem>
</Tabs>

<br/>

The third way is to use the `swizzle` command.

You can use the command to copy the default `Sider` component to your project. This will allow you to customize the sider as you want.

[Refer to the swizzle documentation for more information. &#8594](/docs/packages/documentation/cli/#swizzle)

[use-form-core]: /docs/api-reference/core/hooks/useForm/
[use-form-react-hook-form]: /docs/packages/documentation/react-hook-form/useForm/
[use-form-antd]: /docs/api-reference/antd/hooks/form/useForm/
[edit-mui]: /docs/packages/documentation/mui/edit/
