---
slug: /multipartUpload
id: multipartUpload
title: Multipart Upload
---

`refine` ile birkaç farklı upload yöntemi vardır. Bunlardan biri de multipart upload yöntemidir. 

Base64'e encode ederek dosya yüklemek için [burayı](TODO:url) inceleyebilirsiniz.

### API  
Dosyaları yüklemek için aşağdaki gibi bir end-pointe ihtihacımız var. 

:::tip
Bu end-point mutlaka **Content-type:** multipart/form-data olmalıdır ve `Form Data` binary kabul etmelidir. 
:::

**Method:** POST  
**Path:** /upload  
**Content-type:** multipart/form-data  
**Form Data:** file: binary

**Response:**
```json
{
    "fileUrl": "https://example.com/uploaded-file.jpeg"
} 
```

### Client

UI'da bir upload alanı oluşturmak için aşağıdaki formItem'ı `<Form>` tag'i içine eklemeliyiz. 

```tsx
import { Form, Upload, normalizeFile, useApiUrl } from "@pankod/refine";

const apiUrl = useApiUrl();

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
            maxCount={2}
            multiple
        >
            <p className="ant-upload-text">
                Drag & drop a file in this area
            </p>
        </Upload.Dragger>
    </Form.Item>
</Form.Item>
```

**Dikkat edilmesi gerekenler; **

- `getValueFromEvent={normalizeFile}` kullanılarak upload edilen dosyaların `normalizeFile`dan geçirilmelidir.
- `Upload`'ın `name` prop'u API'a binary olarak gönderilecek file'ın key'ini temsil eder.
- `Upload`'in `action` prop'una yüklenecek dosyaların post edileceği url yazılmalıdır.

:::tip
API'ın url'ini `useApiUrl` hook'u ile alınabilir.
::: 

- Diğer prop özellikleri ve detaylı bilgi için 
[Antd Upload](https://ant.design/components/upload) component'ini inceleyebilirsiniz.

### isLoading State'ini yakalamak

Dosya upload'ı sürerken form'daki `Kaydet` butonunu disable etmek isteyebilirsiniz. Bunun için `useFileUploadState` hook'unu kullanabilirsiniz.

Bu hook `onChange` ve `isLoading` döner. `onChange`'i upload componentine eklemelisiniz.

```tsx
<Upload.Dragger
    ...
    onChange={onChange} >
/>
```

Daha sonra `isLoading`'i istediğiniz yerde kullanabilirsiniz. Biz örnek olarak `Save` butonunda kullanalım.

```tsx
<SaveButton
    ...
    loading={isLoading}
/>
```
