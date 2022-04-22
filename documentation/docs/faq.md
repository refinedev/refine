---
id: faq
title: FAQ
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How can I change the form data before submitting it to the API

You may need to modify the form data before it is sent to the API. 

For example, for `Base64` upload, converting `File` object to `Base64` string would be suitable for this need.


<Tabs
defaultValue="core"
values={[
{label: 'Core Form', value: 'core'},
{label: 'Ant Design Form', value: 'antd'},
{label: 'React Hook Form', value: 'react-hook-form'}
]}>
<TabItem value="core">

```tsx
import { useState } from "react";
import { useForm, file2Base64 } from "@pankod/refine-core";

export const PostCreate = () => {
    const [file, setFile] = useState();
    const { onFinish } = useForm({
        action: "create",
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const base64String = await file2Base64(file);
        onFinish({ file: base64String });
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="file" 
                onChange={(event) => {
                    if (event.target.files) {
                        setFile(event.target.files[0]);
                    }
                }}
            />
            <button type="submit">Submit</button>
        </form>
    );
};
```

</TabItem>
<TabItem value="antd">

```tsx
import { file2Base64 } from "@pankod/refine-core";
import { Form, useForm } from "@pankod/refine-antd";

export const UserCreate: React.FC = () => {
    const { formProps } = useForm();

    return (
        <Form
            {...formProps}
            onFinish={async (values) => {
                const base64Files = [];
                const { avatar } = values;

                for (const file of avatar) {
                    if (file.originFileObj) {
                        const base64String = await file2Base64(file);

                        base64Files.push({
                            ...file,
                            base64String,
                        });
                    } else {
                        base64Files.push(file);
                    }
                }

                return (
                    formProps.onFinish &&
                    formProps.onFinish({
                        ...values,
                        avatar: base64Files,
                    })
                );
            }}
        >
        </Form>
    );
};

```

</TabItem>
<TabItem value="react-hook-form">

```tsx
import { file2Base64 } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

export const PostCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit
    } = useForm();

    const handleSubmitPostCreate = (values) => {
        const { file } = values;
        const base64String = await file2Base64(file);
        onFinish({ file: base64String });
    };

    return (    
        <form onSubmit={handleSubmit(handleSubmitPostCreate)}>
            <input
                {...register("file")}
                type="file" 
            />
        </form>
    );
};
```

</TabItem>
</Tabs>

