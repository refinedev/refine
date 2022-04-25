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
{label: 'React Hook Form', value: 'react-hook-form'}
]}>
<TabItem value="core">

```tsx
import React, { useState } from "react";
import { useForm } from "@pankod/refine-core";

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

```tsx
import React from "react";
import { useForm, Form, Input } from "@pankod/refine-antd";

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

```tsx
import React from "react";
import { useForm } from "@pankod/refine-react-hook-form";

export const UserCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit
    } = useForm();

    const handleSubmitPostCreate = (values) => {
        const { name, surname } = values;
        const fullName = `${name} ${surname}`;
        onFinish({ 
            ...value, 
            fullName 
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
import { useTable, useList, useForm, useShow, useEditableTable } from "@pankod/refine-core";

// All "data" related hooks provided by Refine can use queryOptions' refetch function
const { queryOptions: { refetch } } = useTable();
const { queryOptions: { refetch } } = useForm();
const { queryOptions: { refetch } } = useList();
...
...
const { queryOptions: { refetch } } = useShow();
const { queryOptions: { refetch } } = useEditableTable();
...
...
```

</TabItem>
<TabItem value="useinvalidate">


```tsx
import { useInvalidate } from "@pankod/refine-core";

const invalidate = useInvalidate();

// To invalidate the list and many states of the Posts resource
invalidate({
    resource: "posts",
    invalidates: ["list", "many"]
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

[Refer to the **refine** useInvalidate hook documentation for more information. →](/docs/core/hooks/invalidate/useInvalidate)

</TabItem>
</Tabs>

## How can I request an API with nested route?

**Refine**'s way of doing this is with the `resource` property on all data hooks. You can think of the `resource` property as the URL. 

For example, If you want to make a request of the URL `/user/1/posts`.

```tsx
import { useTable, useOne } from "@pankod/refine-core";

useTable({
    resource: "/users/1/posts"
});
```