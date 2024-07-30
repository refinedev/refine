---
title: Edit
swizzle: true
---

```tsx live shared
window.__refineAuthStatus = false;

setRefineProps({
  notificationProvider: RefineMantine.useNotificationProvider,
  Layout: RefineMantine.Layout,
  Sider: () => null,
});

const Wrapper = ({ children }) => {
  return (
    <MantineCore.MantineProvider
      theme={RefineMantine.LightTheme}
      withNormalizeCSS
      withGlobalStyles
    >
      <MantineCore.Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <MantineNotifications.NotificationsProvider position="top-right">
        {children}
      </MantineNotifications.NotificationsProvider>
    </MantineCore.MantineProvider>
  );
};

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
```

`<Edit>` provides us a layout for displaying the page. It does not contain any logic and just adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    refineCore: { query },
  } = useForm<IPost>({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
      category: {
        id: (value) => (value.length <= 0 ? "Category is required" : null),
      },
    },
  });

  const postData = query?.data?.data;
  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          {...getInputProps("status")}
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
        <Select
          mt={8}
          label="Category"
          placeholder="Pick one"
          {...getInputProps("category.id")}
          {...selectProps}
        />
      </form>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/docs/packages/list-of-packages) to customize it.

:::

## Properties

### title

`title` allows the addition of titles inside the `<Edit>` component. if you don't pass title props it uses the "Edit" prefix and singular resource name by default. For example, for the "posts" resource, it will be "Edit post".

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { Title } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit title={<Title order={3}>Custom Title</Title>}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### saveButtonProps

`saveButtonProps` can be used to customize the default button of the `<Edit>` component that submits the form:

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ size: "xs" }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [`<SaveButton>` documentation &#8594](/docs/ui-integrations/mantine/components/buttons/save-button)

### canDelete and deleteButtonProps

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property,Refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the `useDelete` method provided by the `dataProvider`.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { usePermissions } from "@refinedev/core";

const PostEdit: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ size: "xs" }}
      /* highlight-end */
      saveButtonProps={{ variant: "outline", size: "xs" }}
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      return {
        data: {},
      };
    },
  };

  window.__refineAuthStatus = true;

  const authProvider = {
    login: async () => {
      return {
        success: true,
        redirectTo: "/",
      };
    },
    register: async () => {
      return {
        success: true,
      };
    },
    forgotPassword: async () => {
      return {
        success: true,
      };
    },
    updatePassword: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      window.__refineAuthStatus = false;
      return {
        success: true,
        redirectTo: "/",
      };
    },
    check: async () => ({
      authenticated: window.__refineAuthStatus ? true : false,
      redirectTo: window.__refineAuthStatus ? undefined : "/login",
    }),
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    getPermissions: async () => ["admin"],
    getIdentity: async () => null,
  };

  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={customDataProvider}
      authProvider={authProvider}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the documentations [`<DeleteButton>` &#8594](/docs/ui-integrations/mantine/components/buttons/delete-button) and [`usePermission` &#8594](/docs/authentication/hooks/use-permissions)

### resource

`<Edit>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Edit>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom/23 previewHeight=280px
setInitialRoutes(["/custom/23"]);

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { Edit } from "@refinedev/mantine";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="categories">
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App: React.FC = () => {
  return (
    <Refine
      legacyRouterProvider={{
        ...routerProvider,
        // highlight-start
        routes: [
          {
            element: <CustomPage />,
            path: "/custom/:id",
          },
        ],
        // highlight-end
      }}
      Layout={Layout}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts" }]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### recordItemId

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL, such as when it is used on a custom page, modal or drawer.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=350px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit, useModalForm } from "@refinedev/mantine";
import { Modal, Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  const {
    modal: { visible, close, show },
    id,
  } = useModalForm({
    action: "edit",
  });

  return (
    <div>
      <Button onClick={() => show()}>Edit Button</Button>
      <Modal
        opened={visible}
        onClose={close}
        // hide-start
        size={700}
        withCloseButton={false}
        // hide-end
      >
        {/* highlight-next-line */}
        <Edit recordItemId={id}>
          <p>Rest of your page here</p>
        </Edit>
      </Modal>
    </div>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="23">Edit Item 23</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### mutationMode

Determines which mode mutation will have while executing `<DeleteButton>`.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

const PostEdit: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm<IPost>({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
    },
  });

  return (
    <Edit
      //highlight-next-line
      mutationMode="undoable"
      canDelete
      saveButtonProps={saveButtonProps}
    >
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
      </form>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [mutation mode documentation &#8594](/advanced-tutorials/mutation-mode.md)

### dataProviderName

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Edit } from "@refinedev/mantine";

// highlight-start
const PostEdit = () => {
  return <Edit dataProviderName="other">...</Edit>;
};
// highlight-end

export const App: React.FC = () => {
  return (
    <Refine
      // highlight-start
      dataProvider={{
        default: dataProvider("https://api.fake-rest.refine.dev/"),
        other: dataProvider("https://other-api.fake-rest.refine.dev/"),
      }}
      // highlight-end
    >
      {/* ... */}
    </Refine>
  );
};
```

### goBack

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts", "/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit goBack="😊">
      <p>Rest of your page here 2</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### isLoading

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit isLoading={true}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mantine` package.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit, Breadcrumb } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      breadcrumb={
        <div
          style={{
            padding: "3px 6px",
            border: "2px dashed cornflowerblue",
          }}
        >
          <Breadcrumb />
        </div>
      }
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/docs/ui-integrations/mantine/components/breadcrumb)

### wrapperProps

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property. For `@refinedev/mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      wrapperProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [`Card` documentation from Mantine &#8594](https://mantine.dev/core/card/)

### headerProps

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### contentProps

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      contentProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/box/)

### headerButtons

By default, the `<Edit/>` component has a [`<ListButton>`][list-button] and a [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, refreshButtonProps, listButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button variant="outline" type="primary">
            Custom Button
          </Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `refreshButtonProps` and `listButtonProps` to utilize the default values of the [`<ListButton>`][list-button] and [`<RefreshButton>`][refresh-button] components.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit, RefreshButton, ListButton } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ refreshButtonProps, listButtonProps }) => (
        <>
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
          <Button variant="outline" type="primary">
            Custom Button
          </Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { Modal, Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtonProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
      headerButtons={
        <Button variant="outline" type="primary">
          Custom Button
        </Button>
      }
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### footerButtons

By default, the `<Edit/>` component has a [`<SaveButton>`][save-button] and a [`<DeleteButton>`][delete-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps, deleteButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If [`canDelete`](#candelete-and-deletebuttonprops) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button variant="gradient">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` and `deleteButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] and [`<DeleteButton>`][delete-button] components.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit, SaveButton, DeleteButton } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps} hideText />
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} hideText />
          )}
          <Button variant="gradient">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtonProps={{
        style: {
          // hide-start
          float: "right",
          marginRight: 24,
          // hide-end
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### autoSaveProps

You can use the auto save feature of the `<Edit/>` component by using the `autoSaveProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";

// visible-block-start
const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    refineCore: {
      query,
      // highlight-next-line
      autoSaveProps,
    },
  } = useForm<IPost>({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
      category: {
        id: (value) => (value.length <= 0 ? "Category is required" : null),
      },
    },
    // highlight-start
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
    // highlight-end
  });

  const postData = query?.data?.data;
  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      // highlight-next-line
      autoSaveProps={autoSaveProps}
    >
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          {...getInputProps("status")}
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
        <Select
          mt={8}
          label="Category"
          placeholder="Pick one"
          {...getInputProps("category.id")}
          {...selectProps}
        />
      </form>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## API Reference

### Props

<PropsTable module="@refinedev/mantine/Edit" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Edit {resource.name}</Title>`" />

[list-button]: /docs/ui-integrations/mantine/components/buttons/list-button
[refresh-button]: /docs/ui-integrations/mantine/components/buttons/refresh-button
[save-button]: /docs/ui-integrations/mantine/components/buttons/save-button
[delete-button]: /docs/ui-integrations/mantine/components/buttons/delete-button
