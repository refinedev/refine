---
id: base64-upload
title: Base64 Upload
---

Formlarınızdan dosya ve resimleri base64'e encode ederek upload için, [Ant Design](https://ant.design/) ile gelen [`<Form>`](https://ant.design/components/form/#Form) componentinin `onFinish` propuna vereceğiniz fonksiyon ile submit öncesinde, gereken tüm dosyaları base64 formatına çevirebilirsiniz.

# Örnek

Bunu nasıl yapabileceğimizi görmek için basit bir örnek yapalım. Base64 tipinde dosya yüklemesi yapacağımız alanın adı `avatar` olsun.

```tsx title="pages/users/create.tsx"
import {
    Create,
    Form,
    Upload,
    Input,
    useForm,
    getValueFromEvent,
    file2Base64,
} from "@pankod/refine";

import { IUser } from "../../interfaces";

export const UserCreate: React.FC = () => {
    const { form, formProps, saveButtonProps } = useForm<IUser>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                //highlight-start
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
                //highlight-end
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Avatar">
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger listType="picture" multiple>
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};
```

```ts title="interfaces/index.d.ts"
export interface IUser {
    id: string;
    firstName: string;
    avatar: [
        {
            uid: string;
            name: string;
            url: string;
            status: "error" | "success" | "done" | "uploading" | "removed";
        },
    ];
}
```

`file2Base64` fonksiyonunu kullanarak dosyaları base64'e çevirebilirsiniz.

:::tip
`<Create>` yerine `<Edit>` componenti kullanılarak, kodun kalanında değişiklik yapmadan, düzenleme formu yapılabilir.
:::

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-base64-upload-example-tz06h?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fusers%2Fedit.tsx&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-base64-upload-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
 