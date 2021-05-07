---
id: base64upload
title: Uploading Base64
sidebar_label: Uploading Base64
---

Formlarınızdan dosya ve resimleri base64'e encode ederek upload için, [Ant Design](https://ant.design/) ile gelen [`<Form>`](https://ant.design/components/form/#Form) componentinin `onFinish` propuna vereceğiniz fonksiyon ile submit öncesinde, gereken tüm dosyaları base64 formatına çevirebilirsiniz.

# Örnek

Bunu nasıl yapabileceğimizi görmek için basit bir örnek yapalım. Base64 tipinde dosya yüklemesi yapacağımız alanın adı `avatar` olsun.

```tsx title="src/pages/users/create.tsx"
import {
    Create,
    Form,
    IResourceComponentsProps,
    Upload,
    useForm,
    getValueFromEvent,
    file2Base64,
} from "@pankod/refine";

export const UserCreate = (props: IResourceComponentsProps) => {
    const { form, formProps, saveButtonProps } = useForm();

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                wrapperCol={{ span: 24 }}
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
            ...
                <Form.Item label="avatar">
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
                            <p className="ant-upload-text">Drag & drop a file in this area</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};
```

`file2Base64` fonksiyonunu kullanarak dosyaları base64'e çevirebilirsiniz. 

`<Create>` yerine `<Edit>` componenti kullanılarak, kodun kalanında değişiklik yapmadan, düzenleme formu yapılabilir.
