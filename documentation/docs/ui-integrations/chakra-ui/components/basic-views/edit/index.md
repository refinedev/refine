---
title: Edit
swizzle: true
---

```tsx live shared
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  Layout: RefineChakra.Layout,
  Sider: () => null,
});

const Wrapper = ({ children }) => {
  return (
    <ChakraUI.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </ChakraUI.ChakraProvider>
  );
};

const DummyListPage = () => (
  <ChakraUI.VStack alignItems="flex-start">
    <ChakraUI.Text>This page is empty.</ChakraUI.Text>
    <EditButton colorScheme="black" recordItemId="123">
      Edit Item 123
    </EditButton>
  </ChakraUI.VStack>
);

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
import { EditButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

const PostEdit: React.FC = () => {
  const {
    refineCore: { formLoading, query },
    saveButtonProps,
    register,
    formState: { errors },
    resetField,
  } = useForm<IPost>();

  const { options } = useSelect({
    resource: "categories",

    defaultValue: query?.data?.data.category.id,
    queryOptions: { enabled: !!query?.data?.data.category.id },
  });

  useEffect(() => {
    resetField("category.id");
  }, [options]);

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.status}>
        <FormLabel>Status</FormLabel>
        <Select
          id="content"
          placeholder="Select Post Status"
          {...register("status", {
            required: "Status is required",
          })}
        >
          <option>published</option>
          <option>draft</option>
          <option>rejected</option>
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.categoryId}>
        <FormLabel>Category</FormLabel>
        <Select
          id="ca"
          placeholder="Select Category"
          {...register("category.id", {
            required: true,
          })}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.categoryId?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Properties

### title

`title` allows the addition of titles inside the `<Edit>` component. if you don't pass title props it uses the "Edit" prefix and singular resource name by default. For example, for the "posts" resource, it would be "Edit post".

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit title={<Heading size="lg">Custom Title</Heading>}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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
import { EditButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ colorScheme: "red" }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

> For more information, refer to the [`<SaveButton>` documentation &#8594](/docs/ui-integrations/chakra-ui/components/buttons/save-button)

### canDelete and deleteButtonProps

`canDelete` allows us to add the delete button inside the `<Edit>` component that executes the `useDelete` method provided by the `dataProvider` when clicked on.

If the resource has the `canDelete` property, Refine adds the delete button by default. If you want to customize this button, you can use the `deleteButtonProps` property like the code below.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { usePermissions } from "@refinedev/core";

const PostEdit: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ colorScheme: "orange" }}
      /* highlight-end */
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
    <RefineHeadlessDemo
      dataProvider={customDataProvider}
      authProvider={authProvider}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

> For more information, refer to the [`<DeleteButton>` &#8594](/docs/ui-integrations/chakra-ui/components/buttons/delete-button) and [`usePermission` &#8594](/docs/authentication/hooks/use-permissions) documentations

### resource

`<Edit>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Edit>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom/23 previewHeight=280px
setInitialRoutes(["/custom/23"]);

import routerProvider from "@refinedev/react-router-v6/legacy";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { Layout } from "@refinedev/chakra-ui";
// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

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

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=350px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { useModalForm } from "@refinedev/react-hook-form";
import { Edit } from "@refinedev/chakra-ui";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  const {
    modal: { visible, close, show },
    id,
  } = useModalForm({
    refineCoreProps: { action: "edit" },
  });

  return (
    <div>
      <Button onClick={() => show()}>Edit Button</Button>
      <Modal isOpen={visible} onClose={close} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Edit</ModalHeader>

          <ModalBody>
            {/* highlight-next-line */}
            <Edit recordItemId={id}>
              <p>Rest of your page here</p>
            </Edit>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
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

:::simple Implementation Tips

The `<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.

:::

### mutationMode

`mutationMode` determines which mode the mutation will have while executing `<DeleteButton>`.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPost>();

  return (
    <Edit
      //highlight-next-line
      mutationMode="undoable"
      canDelete
      saveButtonProps={saveButtonProps}
    >
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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
import { Edit } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

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
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
/* highlight-next-line */
import { IconMoodSmile } from "@tabler/icons-react";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit goBack={<IconMoodSmile />}>
      <p>Rest of your page here 2</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/chakra-ui` package.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit, Breadcrumb } from "@refinedev/chakra-ui";
import { Box } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      breadcrumb={
        <Box borderColor="blue" borderStyle="dashed" borderWidth="2px">
          <Breadcrumb />
        </Box>
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

> For more information, refer to the [`Breadcrumb` documentation &#8594](/docs/ui-integrations/chakra-ui/components/breadcrumb)

### wrapperProps

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property. For `@refinedev/chakra-ui` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      wrapperProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

### headerProps

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

### contentProps

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      contentProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

### headerButtons

By default, the `<Edit/>` component has a [`<ListButton>`][list-button] and a [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, refreshButtonProps, listButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::simple Implementation Tips

If the "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

:::

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Button, HStack, Box } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <HStack>
          {defaultButtons}
          <Button colorScheme="red">Custom Button</Button>
        </HStack>
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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
import { EditButton, RefreshButton, ListButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Button, HStack, Box } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ refreshButtonProps, listButtonProps }) => (
        <HStack>
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
          <Button colorScheme="red">Custom Button</Button>
        </HStack>
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtonProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
      }}
      // highlight-end
      headerButtons={
        <Button variant="outline" colorScheme="green">
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

### footerButtons

By default, the `<Edit/>` component has a [`<SaveButton>`][save-button] and a [`<DeleteButton>`][delete-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps, deleteButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::simple Implementation Tips

If [`canDelete`](#candelete-and-deletebuttonprops) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

:::

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <HStack borderColor="blue" borderStyle="dashed" borderWidth="2px" p="2">
          {defaultButtons}
          <Button colorScheme="red" variant="solid">
            Custom Button
          </Button>
        </HStack>
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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
import { EditButton, SaveButton, DeleteButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <HStack borderColor="blue" borderStyle="dashed" borderWidth="2px" p="2">
          <SaveButton {...saveButtonProps} hideText />
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} hideText />
          )}
          <Button colorScheme="red" variant="solid">
            Custom Button
          </Button>
        </HStack>
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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
import { EditButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtonProps={{
        float: "right",
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
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
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

### autoSaveProps

You can use the auto save feature of the `<Edit/>` component by using the `autoSaveProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

// visible-block-start
const PostEdit: React.FC = () => {
  const {
    refineCore: {
      formLoading,
      query,
      // highlight-next-line
      autoSaveProps,
    },
    saveButtonProps,
    register,
    formState: { errors },
    resetField,
  } = useForm<IPost>({
    // highlight-start
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
    // highlight-end
  });

  const { options } = useSelect({
    resource: "categories",

    defaultValue: query?.data?.data.category.id,
    queryOptions: { enabled: !!query?.data?.data.category.id },
  });

  useEffect(() => {
    resetField("category.id");
  }, [options]);

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      // highlight-next-line
      autoSaveProps={autoSaveProps}
    >
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.status}>
        <FormLabel>Status</FormLabel>
        <Select
          id="content"
          placeholder="Select Post Status"
          {...register("status", {
            required: "Status is required",
          })}
        >
          <option>published</option>
          <option>draft</option>
          <option>rejected</option>
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.categoryId}>
        <FormLabel>Category</FormLabel>
        <Select
          id="ca"
          placeholder="Select Category"
          {...register("category.id", {
            required: true,
          })}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.categoryId?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

<PropsTable module="@refinedev/chakra-ui/Edit" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Edit {resource.name}</Title>`" />

[list-button]: /docs/ui-integrations/chakra-ui/components/buttons/list-button
[refresh-button]: /docs/ui-integrations/chakra-ui/components/buttons/refresh-button
[save-button]: /docs/ui-integrations/chakra-ui/components/buttons/save-button
[delete-button]: /docs/ui-integrations/chakra-ui/components/buttons/delete-button
