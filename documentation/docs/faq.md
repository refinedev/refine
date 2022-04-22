---
id: faq
title: FAQ
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How can I change the form data before submitting it to the API

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

    const onSubmit = async (e) => {
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

