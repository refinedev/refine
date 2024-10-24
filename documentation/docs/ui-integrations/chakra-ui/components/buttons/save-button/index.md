---
title: Save
swizzle: true
---

```tsx live shared
const { default: sharedRouterProvider } = LegacyRefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  legacyRouterProvider: sharedRouterProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  Layout: RefineChakra.Layout,
  Sider: () => null,
  catchAll: <RefineChakra.ErrorComponent />,
});

const Wrapper = ({ children }) => {
  return (
    <ChakraUI.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </ChakraUI.ChakraProvider>
  );
};
```

`<SaveButton>` uses Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) component. It uses it for presantation purposes only. Some of the hooks that Refine has adds features to this button.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

For example, lets add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/docs/packages/list-of-packages) hook.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@refinedev/core";
import { EditButton } from "@refinedev/chakra-ui";

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
    // highlight-next-line
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
    // highlight-next-line
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
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <RefineChakra.VStack alignItems="flex-start">
              <RefineChakra.Text>This page is empty.</RefineChakra.Text>
              <EditButton colorScheme="black" recordItemId="123">
                Edit Item 123
              </EditButton>
            </RefineChakra.VStack>
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

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}
```

## Properties

### hideText

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { SaveButton } from "@refinedev/chakra-ui";

const MySaveComponent = () => {
  return <SaveButton hideText />;
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          list: MySaveComponent,
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

### Properties

<PropsTable module="@refinedev/chakra-ui/SaveButton" />
