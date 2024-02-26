---
title: Create
swizzle: true
---

```tsx live shared
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
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

`<Create>` provides us a layout to display the page. It does not contain any logic and just adds extra functionalities like action buttons and being able to give titles to the page.

We will show what `<Create>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px hideCode
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";

const PostCreate: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm<IPost>({
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

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

`title` allows the addition of titles inside the `<Create>` component by passing title props. If you don't pass title props, however, it uses the "Create" prefix and the singular resource name by default. For example, for the `/posts/create` resource, it would be "Create post".

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Title } from "@mantine/core";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create title={<Title order={3}>Custom Title</Title>}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

`saveButtonProps` can be used to customize the default button of the `<Create>` component that submits the form:

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create saveButtonProps={{ size: "xs" }}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### resource

The `<Create>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Create>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom previewHeight=280px
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { Layout } from "@refinedev/mantine";
// visible-block-start
import { Create } from "@refinedev/mantine";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create resource="categories">
      <p>Rest of your page here</p>
    </Create>
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
            path: "/custom",
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

### goBack

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts", "/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create goBack="😊">
      <p>Rest of your page here 2</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create isLoading={true}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create, Breadcrumb } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property. For `@refinedev/mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=320px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtonProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
      headerButtons={<Button type="primary">Custom Button</Button>}
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

By default, the `<Create/>` component has a [`<SaveButton>`][save-button] at the header.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] component.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create, SaveButton } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      footerButtons={({ saveButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps} hideText />
          <Button variant="gradient">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@refinedev/core";
import { CreateButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      legacyRouterProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

<PropsTable module="@refinedev/mantine/Create" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Create {resource.name}</Title>`"/>

[save-button]: /docs/ui-integrations/chakra-ui/components/buttons/save-button
