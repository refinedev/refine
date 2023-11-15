---
title: General Concepts 🚧
---

Refine is an extensible framework designed for rapidly building web applications. It offers a modern, **hook-based architecture**, a **pluggable system of providers**, and a robust **state management** solution. This section provides an overview of the key concepts in Refine.

## Resource Concept

In Refine, a **resource** is a central concept representing an **entity**, which ties together various aspects of your application.

They typically refers to a data entity, like `products`, `blogPosts`, or `orders`.

Resource definitions allows you to manage your application in a structured way, abstracting complex operations into simpler actions through various **providers** and **UI integrations**.

A typical resource definition looks like this:

```tsx title=App.tsx
import { Refine } from "@refinedev/core";

export const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "products",
          list: "/my-products",
          show: "/my-products/:id",
          edit: "/my-products/:id/edit",
          create: "/my-products/new",
        },
      ]}
    >
      {/* ... */}
    </Refine>
  );
};
```

## Provider Concept

Providers are the building blocks of Refine, used to manage different aspects of your application, such as data fetching, routing, access control, and more.

They are pluggable, which means you can use the **built-in providers** or **create your own**. This allows you to customize the behavior of your application to suit your needs.

- **Data Provider**: Communication with the backend data source, handling data operations such as fetching, creating, updating, deleting records, caching, and invalidation.
- **Authentication Provider**: Manages user authentication and authorization processes. Handles redirection, error cases.
- **Access Control Provider**: Handles authorization and access control. Used to hide/disable buttons and menu items, or to protect routes and components.
- **Notification Provider**: Enables notification features like showing notification after successful mutations or errors.
- **I18n Provider**: Enables i18n features such as renderin translated menu items, button texts, table columns, page titles, and more.
- **Live Provider**: Enables real-time updates to your application. For example, when a user creates a new record, other users can see the new record in the list page without refreshing the page.
- **Router Provider**: Matches routes to resources, enables navigation features like breadcrumbs, automatic redirections after CRUD operations, rendering menu items.

## Hook Concept

refine adopts a hook-based architecture, a modern and powerful pattern in React development, which significantly enhances the development experience and application performance.

Burayi uzatalim

## Providers

### Data Provider

The Data Provider is the bridge between your frontend and your backend data source. It is responsible for handling all data-related operations such as fetching, caching, creating, updating, and deleting records.

Each data operation in the Data Provider is typically associated with a specific resource. For example, when fetching data for a `products` resource, the Data Provider will know which endpoint to hit and how to handle the response.

```tsx title=data-provider.ts
import { DataProvider } from "@refinedev/core";

const myDataProvider: DataProvider = {
  getOne: ({ resource, id }) => {
    fetch(`https://example.com/api/v1/${resource}/${id}`);
  },
  // other methods...
};
```

Refine offers various built-in data providers, such as xxxx.

> See the [Data Fetching](/docs/guides-concepts/data-fetching/) guide for more information.

#### Hooks

You can use `useList`, `useOne`, `useCreate`, `useEdit`, `useShow` hooks to fetch data in your components.

```tsx title=show.tsx
export const ShowPage = () => {
  const { data, isLoading } = useOne({ resource: "products", id: 1 });

  if (isLoading) {
    return <Loading />;
  }

  return <>{data.name}</>;
};
```

### Authentication Provider

The Authentication Provider centralizes the authentication and authorization processes in **refine** applications.

It handles authentication and authorization processes such as login, logout, redirection, error handling, and more.

```tsx title=auth-provider.ts
import { AuthProvider } from "@refinedev/core'";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { status } = handleLogin(email, password);

    if (status === 200) {
      return { success: true, redirectTo: "/dashboard" };
    } else {
      return {
        success: false,
        error: { name: "Login Error", message: "Invalid credentials" },
      };
    }
  },
  check: async (params) => ({}),
  logout: async (params) => ({}),
  onError: async (params) => ({}),
  register: async (params) => ({}),
  forgotPassword: async (params) => ({}),
  updatePassword: async (params) => ({}),
  getPermissions: async (params) => ({}),
  getIdentity: async (params) => ({}),
};
```

> See the [Authentication](/docs/guides-concepts/authentication/) guide for more information.

#### Components

You can use `Authenticated` component from `@refinedev/core` to protect your routes, components with authentication.

```tsx title=show.tsx
import { Authenticated } from "@refinedev/core";

export const ShowPage = () => {
  return (
    // Unauthenticated users will be redirected to login page.
    <Authenticated>
      Product Details Page
      <DeleteButton />
    </Authenticated>
  );
};
```

#### Hooks

You can use `useGetIdentity` hook to get current user.

```tsx title=show.tsx
import { useGetIdentity } from "@refinedev/core";

export const DashboardPage = () => {
  const {
    data: { name },
  } = useGetIdentity();

  return <>Welcome {name}!</>;
};
```

> Mention we have more hooks

#### UI Integrations

We have pre-built components which works with Auth Provider out-of-the-box.

When provided, their Layout components can automatically render current user information on the header and add logout button to appropriate places.

You can also use `AuthPage` component of these integrations for `Login`, `Register`, `Forgot Password`, `Reset Password` pages.

```tsx title=auth.tsx
import { AuthPage } from "@refinedev/antd"; // or @refinedev/mui, @refinedev/chakra-ui, @refinedev/mantine

export const Auth = () => {
  return (
    <AuthPage
      type="login" // register, forgot-password, reset-password
    />
  );
};
```

### Access Control Provider

The Access Control Provider manages what users can access or perform within the application based on their permissions.

It uses the resource definition to determine access rights. For instance, it can decide whether a user can edit or delete record for `products` resource based on the current user's information and resource definition.

```tsx title=App.tsx
import { AccessControlProvider, Refine } from "@refinedev/core";

const myAccessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, user }) => {
    if (user.role === "admin" && action === "delete") {
      return { can: true };
    }
  },
};

export const App = () => {
  return (
    <Refine accessControlProvider={myAccessControlProvider} {/* ...*/}>
      {/* ... */}
    </Refine>
  )
}
```

> See the [Authorization](/docs/guides-concepts/authorization/) guide for more information.

#### Components

You can wrap `CanAccess` component to wrap relevant parts of your application to control access.

```tsx title=show.tsx
import { CanAccess } from "@refinedev/core";

export const ShowPage = () => {
  return (
    <>
      User Page
      <CanAccess resource="users" action="block">
        // Only admins can see this.
        <BlockUserButton />
      </CanAccess>
    </>
  );
};
```

#### Hooks

You can use `useCan` hook to control access in your components.

```tsx title=show.tsx
import { useCan } from "@refinedev/core";

export const ShowPage = () => {
  const canBlock = useCan({ resource: "users", action: "block" });

  return (
    <>
      User Page
      {canBlock && <BlockUserButton />}
    </>
  );
};
```

#### UI Integrations

When provided, our UI Integrations works out-of-the-box with Access Control Provider.

For example if user isn't authorized to see `orders` resource, it will be hidden on the sidebar menu automatically.

Or if the current user isn't authorized to delete a product, the delete button will be disabled or hidden automatically.

```tsx title=example.tsx
import { DeleteButton } from "@refinedev/antd"; // or @refinedev/mui, @refinedev/chakra-ui, @refinedev/mantine

export const ShowPage = () => {
  return (
    <>
      Product Details Page
      <DeleteButton /> // Only admins can see this.
    </>
  );
};
```

This applies to all buttons like `CreateButton`, `EditButton`, `ShowButton`, `ListButton`.

### Notification Provider

**refine** can automatically show notifications for CRUD operations and errors.

For example, after creating, updating, or deleting a record for `products` resource, or when an error occurs on form submission.

**refine** has out-of-the-box notification providers for popular UI libraries like **AntD**, **Material UI**, **Chakra UI**, and **Mantine**.

> See the [Notifications](/docs/guides-concepts/notifications/) guide for more information.

#### Hooks

Mention data hooks and mutation hooks shows notification also accepts successNotificationParams, errorNotificationParams vs vs.

If you still have use-case we haven't covered, you can use `useNotification` hook to show notifications in your components.

```tsx title=show.tsx
import { useNotification } from "@refinedev/core";

export const ShowPage = () => {
  const { open } = useNotification();

  return (
    <Button
      onClick={() => {
        open({
          message: "Test Notification",
          description: "This is a test notification.",
          type: "success", // success | error | progress
        });
      }}
    >
      Show notification
    </Button>
  );
};
```

### I18n Provider

I18n provider centralizes localization process in **refine** applications.

```tsx title=App.tsx
import { Refine, I18nProvider } from "@refinedev/core";

const i18nProvider: I18nProvider = {
    translate: (key: string, options?: any, defaultMessage?: string) => string,
    changeLocale: (lang: string, options?: any) => Promise,
    getLocale: () => string,
};

export const App = () => {
  return (
    <Refine i18nProvider={i18nProvider} {/* ...*/}>
      {/* ... */}
    </Refine>
  )
}
```

#### Hooks

You can use `useTranslate`, `useSetLocale`, `useGetLocale` hooks to handle i18n in your components.

```tsx title=show.tsx
import { useTranslate, useSetLocale, useGetLocale } from "@refinedev/core";

export const ShowPage = () => {
  const translate = useTranslate();
  const setLocale = useSetLocale();
  const getLocale = useGetLocale();

  return (
    <>
      Current Locale: {getLocale()}
      <Button onClick={() => setLocale("tr")}>Set Locale to Turkish</Button>
      <Button onClick={() => setLocale("en")}>Set Locale to English</Button>

      <Button>{translate('Hello')</Button>
    </>
  );
};

```

#### UI Integrations

When provided, our UI Integrations works out-of-the-box with I18n Provider.

For example, it will automatically translate menu items, button texts, table columns, page titles, and more.

> See the [Internationalization](/docs/guides-concepts/internationalization/) guide for more information.

### Router Provider

Router provider helps **refine** understand the relationship between resources and routes. Enables navigation features like breadcrumbs, automatic redirections after CRUD operations, rendering menu items.

We have built-in router integrations for the following packages:

- React Router V6
- NextJS
- Remix
- Expo Router (Community Package)

> See the [Routing](/docs/guides-concepts/routing/) page for more information.

#### Components

**UI Integration** components can infer resource information from the current URL.

#### Hooks

**refine** hooks can infer certain parameters from the current URL.

## UI Integrations

While **refine** itself is headless, it offers UI Integrations for popular UI libraries for **Ant Design**, **Material UI**, **Chakra UI**, and **Mantine**.

These integrations use `@refinedev/core` under the hood, becomes a bridge between the UI library and the **refine** framework.

import { AntdLayout } from './layout/antd';

<AntdLayout />

### Layout

UI Integrations provides a Layout components, which renders the `sidebar menu`, `header`, and `content` area of your application.

It automatically renders the sidebar menu based on the resource definitions, and the header based on the current user.

### CRUD Pages

`List`, `Create`, `Edit`, `Show` components.

These components provides layout view based on the resource information automatically like:

- Header with title
- Breadcrumb
- Translated texts
- CRUD Buttons

On top of that, **refine** adds some features to these layouts:

- Translation: buttons, titles, columns will be translated to the current language of the user.
- Access Control: If the current user isn't authorized to create a product, the create button will be disabled or hidden automatically.

### Buttons

For example, `@refinedev/antd` package exports `CreateButton`, for redirecting the user to the create page of the resource.

While the button itself is imported from `antd` package, **refine** adds some capabilities to it:

- **Routing**: when the button is clicked, the user will be redirected to the create page of the resource.
- **Access Control**: if current user isn't authorized, this button will be disabled or hidden automatically.
- **Translation**: the button's text will be translated to the current language of the user.

### Auth Pages

Common authentication pages like `Login`, `Register`, `Forgot Password`, `Reset Password` integrated with `AuthProvider` automatically.

### UI Integration Hooks

UI Integration hooks uses `@refinedev/core` hooks under the hood, making it easier to use them in your UI specific components.

One example is, `useTable` hook from `@refinedev/antd` package. This hook uses `@refinedev/core`'s `useTable` under the hood, but returns props compatible with `antd`'s `Table` component. So you don't need to manually map the props.

You can see the list of hooks for each UI Integration listed below:

<Tabs>

<TabItem value="antd">

- useForm
- useModalForm
- useDrawerForm
- useStepsForm
- useTable
- useSelect
- useCheckboxGroup
- useRadioGroup
- useImport
- useSimpleList
- useFileUploadState
- useModal
- useThemedLayoutContext

</TabItem>

<TabItem value="Material UI">

- useAutoComplete
- useDataGrid
- useSiderVisible
- useThemedLayoutContext

</TabItem>

<TabItem value="Chakra UI">

- usePagination
- useThemedLayoutContext

</TabItem>

<TabItem value="Mantine">

- useForm
- useModalForm
- useStepsForm
- useSelect
- useThemedLayoutContext

</TabItem>

</Tabs>

## Meta Concept

`meta` is a special property that can be used to provide additional information to **providers** and **UI Integrations**.

There are 3 ways to populate meta, they all will be merged into meta property and will be available to providers and UI integrations.

<Tabs>
<TabItem value="resource.meta property">

```tsx title=App.tsx
import { Refine } from "@refinedev/core";

export const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "products",
          list: "/my-products",
          // highlight-start
          meta: {
            fromResource: "Hello from resource.meta",
          },
          // highlight-end
        },
      ]}
    >
      {/* ... */}
    </Refine>
  );
};
```

</TabItem>
<TabItem value="hook.meta property">

```tsx title=show.tsx
import { useOne } from "@refinedev/core";

export const ShowPage = () => {
  const { data, isLoading } = useOne({
    resource: "products",
    id: 1,
    // highlight-start
    meta: {
      fromHook: "Hello from hook.meta",
    },
    // highlight-end
  });
};
```

</TabItem>
<TabItem value="meta from URL">

Navigate to the following URL:

```
https://example.com/products?fromURL=Hello%20from%20URL
```

</TabItem>
</Tabs>

Given the above examples, meta fields from 3 different sources will be available in the providers:

```tsx title=providers.tsx
import { AccessControlProvider, DataProvider } from "@refinedev/core";

export const myDataProvider = {
  getOne: async ({ meta }) => {
    console.log(meta.fromResource); // "Hello from resource.meta"
    console.log(meta.fromHook); // "Hello from hook.meta"
    console.log(meta.fromURL); // "Hello from URL"
  },
};

export const myAccessControlProvider = {
  can: async ({ meta }) => {
    console.log(meta.fromResource); // "Hello from resource.meta"
    console.log(meta.fromHook); // "Hello from hook.meta"
    console.log(meta.fromURL); // "Hello from URL"
  },
};
```

### Example Use Case

For **UI Integrations**:

- Adding a label and icon to a resource definition to render the sidebar menu item.

For **data provider** or **access control provider**:

- pass a filter to your **data provider** to fetch only unlisted products
- pass a role to your **access control provider** to allow only category managers to access the resource.

```tsx title=App.tsx
import { Refine } from "@refinedev/core";

export const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "unlistedProducts",
          list: "/unlisted-products",
          meta: {
            // for data provider
            filter: { isListed: false },
            // for access control provider
            role: "category-manager",
            // for UI integrations
            label: "Unlisted Products",
            icon: <ProductIcon />,
          },
        },
      ]}
      dataProvider={{
        getOne: async ({ meta }) => {
          console.log(meta.filter); // { isListed: false }
        },
      }}
      accessControlProvider={{
        can: async ({ meta }) => {
          console.log(meta.role); // "category-manager"
        },
      }}
    >
      {/* ... */}
    </Refine>
  );
};
```

These are some but not all examples of how you can use the `meta` property.

See the [Refine Component](/docs/core/refine-component) page for more information.

## State Management

refine leverages React Query for data fetching and caching, which enhances the performance and user experience of applications. React Query provides efficient data synchronization between your server and UI, making it easier to handle background updates, cache management, and data invalidation.

Key Aspects of State Management in refine:

- **Data Fetching and Caching**: refine handles data fetching with built-in hooks that automatically manage the loading states, caching, and updating of data. This integration means fewer boilerplate codes and a more streamlined approach to handling server-state.

- **Invalidation and Refetching**: One of the challenges in state management is knowing when to invalidate and refetch data. refine, through React Query, provides simple yet powerful mechanisms to control data refetching. This ensures that the UI always reflects the most current data.

- **Query Keys Structure**: Each data fetching operation in refine is associated with a unique query key. These keys are used to uniquely identify and cache server responses, making it easy to optimize performance by reusing cached data when needed.

- **Mutation and Cache Updates**: When a mutation (create, update, delete) occurs, refine allows for the automatic or manual invalidation of related queries. This ensures that the data your users interact with is always fresh and consistent with the backend.

## Developer Experience

### CLI

TBA.

### Dev Tools

TBA.

### Inferencer

TBA.

```

```
