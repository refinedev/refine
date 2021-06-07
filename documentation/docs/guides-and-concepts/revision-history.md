---
id: revision-history
title: Revision History
---

import notConfigured from '@site/static/img/guides-and-concepts/revision-history/not-configured.jpg';
import configured from '@site/static/img/guides-and-concepts/revision-history/configured.jpg';

You can see the revision history on the edit pages in `refine`. This feature gives information about which user created/edited the content.

### Usage

You can specify this configuration from the `Admin` component to the entire application or from the `Edit` component to specific resources. First of all, we add the `showRevisions` prop to the `Admin` component.

```tsx title="App.tsx"
<Admin 
    dataProvider={dataProvider(API_URL)}
    // highlight-next-line
    showRevisions
>
    <Resource
        name="posts"
        list={PostList}
        create={PostCreate}
        edit={PostEdit}
        show={PostShow}
    />
</Admin>
```

After this process, a warning like the one below will appear on the 'Edit' pages. This is because there is **no `revisions` method** in the `dataProvider`.

<div style={{textAlign: "center"}}>
    <img src={notConfigured} />
</div>
<br/>

To use this method, there is an end-point like the one below.

```json title="https://refine-fake-rest.pankod.com/revisions/posts/1"
[
  {
    "id": 1,
    "action": "create",
    "date": "2021-05-21T11:42:48.711Z",
    "resource": "users",
    "user": {
      "id": 77005,
      "firstName": "Gaetano",
      "lastName": "Conroy"
    }
  },
  {
    "id": 6,
    "action": "edit",
    "date": "2021-05-22T11:42:48.711Z",
    "resource": "users",
    "user": {
      "id": 75285,
      "firstName": "Florence",
      "lastName": "Predovic"
    }
  },
  ...
]
```

You can use this end-point in **your data provoder** with `revisions` method as follows.

```ts 
revisions: async (resource, id) => {
    const { data } = await httpClient.get(
        `${apiUrl}/revisions/${resource}/${id}`,
    );

    return {
        data,
    };
},
```

After updating your dataprovider, the **Revision History** will appear as follows.

<div style={{textAlign: "center"}}>
    <img src={configured} />
</div>
<br/>