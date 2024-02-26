---
title: Show
swizzle: true
---

```tsx live shared
setRefineProps({
  Layout: RefineMantine.Layout,
  Sider: () => null,
  notificationProvider: RefineMantine.useNotificationProvider,
});

const Wrapper = ({ children }) => {
  return (
    <MantineCore.MantineProvider
      theme={MantineCore.LightTheme}
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

`<Show>` provides us a layout for displaying the page. It does not contain any logic and just adds extra functionalities like a refresh button and being able to give titles to the page.

We will show what `<Show>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { useShow } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/mantine";
import { Title, Text } from "@mantine/core";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="sm">{record?.id}</Text>

      <Title mt="sm" order={5}>
        Title
      </Title>
      <Text mt="sm">{record?.title}</Text>

      <Title mt="sm" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

`title` allows the addition of titles inside the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it would be "Show post".

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Title } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show title={<Title order={3}>Custom Title</Title>}>
      <p>Rest of your page here</p>
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

### resource

The `<Show>` component reads the `resource` information from the route by default. TIf you want to use a custom resource for the `<Show>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom/123 previewHeight=280px
setInitialRoutes(["/custom/123"]);

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show resource="categories">
      <p>Rest of your page here</p>
    </Show>
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

### canDelete and canEdit

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property Refine adds the buttons by default.

When clicked on, delete button executes the `useDelete` method provided by the [`dataProvider`](/docs/data/data-provider) and the edit button redirects the user to the record edit page.

> For more information, refer to the [`<DeleteButton>`](/docs/ui-integrations/ant-design/components/buttons/delete-button) and the [`<EditButton>`](/docs/ui-integrations/ant-design/components/buttons/edit-button) documentation.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";
import { usePermissions } from "@refinedev/core";
import { Title } from "@mantine/core";

const PostShow: React.FC = () => {
  const { data: permissionsData } = usePermissions();

  return (
    <Show
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      canEdit={permissionsData?.includes("admin")}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
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
      return {
        success: true,
        redirectTo: "/",
      };
    },
    check: async () => ({
      authenticated: true,
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

> For more information, refer to the [`usePermission` documentation &#8594](/docs/authentication/hooks/use-permissions)

### recordItemId

The `<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL, such as when it's used on a custom page, modal or drawer.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=350px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show, useModalForm } from "@refinedev/mantine";
import { Modal, Button } from "@mantine/core";

const PostShow: React.FC = () => {
  const {
    modal: { visible, close, show },
    id,
  } = useModalForm({
    action: "show",
  });

  return (
    <div>
      <Button onClick={() => show()}>Show Button</Button>
      <Modal
        opened={visible}
        onClose={close}
        // hide-start
        size={700}
        withCloseButton={false}
        // hide-end
      >
        {/* highlight-next-line */}
        <Show recordItemId={id}>
          <p>Rest of your page here</p>
        </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

### dataProviderName

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import { Show } from "@refinedev/mantine";
import dataProvider from "@refinedev/simple-rest";

// highlight-start
const PostShow = () => {
  return <Show dataProviderName="other">...</Show>;
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

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts", "/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show goBack="😊">
      <p>Rest of your page here</p>
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show isLoading={true}>
      <p>Rest of your page here</p>
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";

const CustomBreadcrumb: React.FC = () => {
  return (
    <p
      style={{
        padding: "3px 6px",
        border: "2px dashed cornflowerblue",
      }}
    >
      My Custom Breadcrumb
    </p>
  );
};

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      breadcrumb={<CustomBreadcrumb />}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property. For `@refinedev/mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

> For more information, refer to the [`Group` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### contentProps

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

By default, the `<Show/>` component has a [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, deleteButtonProps, editButtonProps, listButtonProps, refreshButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If the "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

If [`canDelete`](#candelete-and-canedit) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

If [`canEdit`](#candelete-and-canedit) is `false`, [`<EditButton>`][edit-button] will not render and `editButtonProps` will be `undefined`.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `createButtonProps` to utilize the default values of the [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] components.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import {
  Show,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      headerButtons={({
        deleteButtonProps,
        editButtonProps,
        listButtonProps,
        refreshButtonProps,
      }) => (
        <>
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
          {editButtonProps && (
            <EditButton {...editButtonProps} meta={{ foo: "bar" }} />
          )}
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} meta={{ foo: "bar" }} />
          )}
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
          <Button variant="outline" type="primary">
            Custom Button
          </Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

[Refer to the `Group` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/group/)

### footerButtons

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
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
      footerButtons={
        <Button variant="outline" type="primary">
          Custom Button
        </Button>
      }
    >
      <p>Rest of your page here</p>
    </Show>
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
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
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

## API Reference

### Props

<PropsTable module="@refinedev/mantine/Show" title-default="<Title order={3}>Show {resource.name}</Title>"/>

[list-button]: /docs/ui-integrations/mantine/components/buttons/list-button
[refresh-button]: /docs/ui-integrations/mantine/components/buttons/refresh-button
[edit-button]: /docs/ui-integrations/mantine/components/buttons/edit-button
[delete-button]: /docs/ui-integrations/mantine/components/buttons/delete-button
