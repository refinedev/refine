---
slug: /multipartUpload
id: multipartUpload
title: Multipart Upload
---

import create from '@site/static/img/multipart-upload-create.jpg';
import uploadedFile from '@site/static/img/multpipart-upload-uploaded.jpg';
import edit from '@site/static/img/multipart-upload-edit.jpg';

We'll show you how to upload multiple files with `refine`.

Let's start with the `creation form` first.

### Create Form

Let's add the cover field to the post creation form.

```tsx
export const PostCreate = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const apiUrl = useApiUrl();

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
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
                // highlight-start
                <Form.Item label="Cover">
                    <Form.Item
                        name="cover"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={5}
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                // highlight-end
            </Form>
        </Create>
    );
};
```

It looks like this.

<>
    <div style={{textAlign: "center"}}>
        <img src={create} />
    </div>
    <br/>
</>

We need now is an upload end-point that accepts multipart uploads. We write this address in the `action` prop of the `Upload` component.

:::tip
We can reach the api url by using the `useApiUrl` hook.  
:::

```json title="[POST] /media/upload"
{
    file: binary
}
```

This end-point should respond similarly.

```json title="[POST] /media/upload"
{
    "fileUrl": "https://example.com/uploaded-file.jpeg"
}
```

<>
    <div style={{textAlign: "center"}}>
        <img src={uploadedFile} />
    </div>
    <br/>
</>

:::important
We have to use the `normalizeFile` method to convert the uploaded files to [Antd UploadFile](https://ant.design/components/upload/#UploadFile) object.
:::

This data is sent to the API when form submitted.

```json title="[POST] https://refine-fake-rest.pankod.com/posts"
{
    "title":"Test",
    "cover": [
        {
            "uid":"rc-upload-1620630541327-7",
            "name":"greg-bulla-6RD0mcpY8f8-unsplash.jpg",
            "url":"https://refine.ams3.digitaloceanspaces.com/78c82c0b2203e670d77372f4c20fc0e2",
            "type":"image/jpeg",
            "size":70922,
            "percent":100,
            "status":"done"
        }
    ],
}
```

:::important
The following data are required for the [Antd Upload](https://ant.design/components/upload) component and all should be saved.
:::

| Property | Description  |
| -------- | ------------ |
| uid      | Unique id    |
| name     | File Name    |
| url      | Download url |
| status   | error, success, done, uploading, removed |

### Edit Form

Let's add the cover field to the post editing form.

```tsx
export const PostEdit = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const apiUrl = useApiUrl();

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
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
                // highlight-start
                <Form.Item label="Cover">
                    <Form.Item
                        name="cover"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={5}
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                // highlight-end
            </Form>
        </Edit>
    );
};
```

<>
    <div style={{textAlign: "center"}}>
        <img src={edit} />
    </div>
<br/>
</>

A request as below is sent for edit form.

```json title="[GET] https://refine-fake-rest.pankod.com/posts/1"
{
    "id": 1,
    "title": "Test",
    "cover": [
        {
            "uid": "rc-upload-1620630541327-7",
            "name": "greg-bulla-6RD0mcpY8f8-unsplash.jpg",
            "url": "https://refine.ams3.digitaloceanspaces.com/78c82c0b2203e670d77372f4c20fc0e2",
            "type": "image/jpeg",
            "size": 70922,
            "percent": 100,
            "status": "done"
        }
    ],
}
```

This data is sent to the API when form submitted.

```json title="[PUT] https://refine-fake-rest.pankod.com/posts/1"
{
    "title": "Test",
    "cover": [
        {
            "uid": "rc-upload-1620630541327-7",
            "name": "greg-bulla-6RD0mcpY8f8-unsplash.jpg",
            "url": "https://refine.ams3.digitaloceanspaces.com/78c82c0b2203e670d77372f4c20fc0e2",
            "type": "image/jpeg",
            "size": 70922,
            "percent": 100,
            "status": "done"
        }
    ]
}
```

### Uploading State

You may want to disable the "Save" button in the form while the upload continues. You can use the `useFileUploadState` hook for this.


```tsx {4,9-12,38}
export const PostCreate = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { isLoading, onChange } = useFileUploadState();

    const apiUrl = useApiUrl();

    return (
        <Create {...props} saveButtonProps={{
                ...saveButtonProps,
                disabled: isLoading,
            }}>
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
                <Form.Item label="Cover">
                    <Form.Item
                        name="cover"
                        valuePropName="fileList"
                        getValueFromEvent={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={5}
                            multiple
                            onChange={onChange}
                        >
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
