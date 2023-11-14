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
          meta: {
            label: "Products",
            icon: <ProductIcon />,
          },
        },
      ]}
    >
      {/* ... */}
    </Refine>
  );
};
```

## Meta Concept

xxx

## Providers

Refine offers a pluggable system of providers, works in pair with **resource** definitions. These providers can be used to manage different aspects of your application:

- **Data Provider**: Communication with the backend data source, handling data operations such as fetching, creating, updating, deleting records, caching, and invalidation.
- **Router Provider**: Matches routes to resources, enables navigation features like breadcrumbs, automatic redirections after CRUD operations, rendering menu items.
- **Access Control Provider**: Handles authorization and access control. Used to hide/disable buttons and menu items, or to protect routes and components.
- **Notification Provider**: Enables notification features like showing notification after successful mutations or errors.
- **Authentication Provider**: Manages user authentication and authorization processes. Handles redirection, error cases.
- **I18n Provider**: Enables i18n features such as renderin translated menu items, button texts, table columns, page titles, and more.
- **Live Provider**: Enables real-time updates to your application. For example, when a user creates a new record, other users can see the new record in the list page without refreshing the page.

### Router Provider

Router provider helps **refine** understand the relationship between resources and routes. Enables navigation features like breadcrumbs, automatic redirections after CRUD operations, rendering menu items.

We have built-in router integrations for the following packages:

- React Router V6
- NextJS
- Remix

See the [Routing](/docs/guides-concepts/routing/) page for more information.

### Data Provider

The Data Provider is the bridge between your frontend and your backend data source. It is responsible for handling all data-related operations such as fetching, creating, updating, and deleting records.

Each data operation in the Data Provider is typically associated with a specific resource. For example, when fetching data for a `products` resource, the Data Provider will know which endpoint to hit and how to handle the response.

```tsx title=data-provider.ts
import { DataProvider } from "@refinedev/core";

const myDataProvider: DataProvider = {
  getList: ({ resource }) => {
    fetch(`https://example.com/api/v1/${resource}`);
  },
  // other methods...
};
```

### Access Control Provider

The Access Control Provider manages what users can access or perform within the application based on their permissions.

It uses the resource definition to determine access rights. For instance, it can decide whether a user can edit or delete record for `products` resource based on the current user's information and resource definition.

```tsx title=access-control-provider.ts
import { AccessControlProvider } from "@refinedev/core";

const myAccessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, user }) => {
    if (user.role === "admin" && action === "delete") {
      return { can: true };
    }
  },
};
```

You can wrap `CanAccess` component to wrap relevant parts of your application to control access.

```tsx title=show.tsx
import { CanAccess } from "@refinedev/core";

export const ShowPage = () => {
  return (
    <>
      Product Details Page
      <CanAccess resource="products" action="delete">
        // Only admins can see this.
        <DeleteButton />
      </CanAccess>
    </>
  );
};
```

### Notification Provider

**refine** can automatically show notifications for CRUD operations and errors. For examples after creating a record for `products` resource, or when an error on form submission.

**refine** has out-of-the-box notification providers for popular UI libraries like `antd`, `material-ui`, `chakra-ui`, and `mantine`.

### Authentication Provider

The Authentication Provider manages user authentication and authorization processes. Handles redirection, error cases.

You can use `Authenticated` component from `@refinedev/core` to protect your routes, components with authentication.

```tsx title=auth-provider.ts
import { AuthProvider } from "@refinedev/core'";

export const authProvider: AuthProvider = () => {
  login: async ({ email, password }) => {
    const response = await fetch("https://example.com/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.token);

      return { success: true, redirectTo: "/dashboard" };
    } else {
      return {
        success: false,
        error: { name: "Login Error", message: "Invalid credentials" },
      };
    }
  };
};
```

## Hooks

refine adopts a hook-based architecture, a modern and powerful pattern in React development, which significantly enhances the development experience and application performance.

### Data Hooks

useList, useOne, useForm...

### UI Hooks

useTable, useModal, useDrawerForm etc..

### Provider Hooks

`useCan`, `useIsAuthenticated`, `useNotification`

### Utility Hooks

`useTranslate`, `useResource`, `useResourceDefinition`, `useMenu`,

## UI Integrations

While **refine** itself is headless, it offers UI Integrations for popular UI libraries for **Ant Design**, **Material UI**, **Chakra UI**, and **Mantine**.

These integrations use `@refinedev/core` under the hood, becomes a bridge between the UI library and the **refine** framework.

### Layout

UI Integrations provides a `ThemedLayout` component, which renders the `sidebar menu`, `header`, and `content` area of your application.

It automatically renders the sidebar menu based on the resource definitions, and the header based on the current user.

Add sandbox example. 4 Tabs, 4 different UI libraries.

#### CRUD Pages

`List`, `Create`, `Edit`, `Show` components.

These components provides layout view based on the resource information automatically like:

- Header with title
- Breadcrumb
- Translated texts
- CRUD Buttons for redirection.

On top of that, **refine** adds some features to these layouts:

- Translation: buttons, titles, columns will be translated to the current language of the user.
- Access Control: If the current user isn't authorized to create a product, the create button will be disabled or hidden automatically.

### Auth Pages

Common authentication pages like `Login`, `Register`, `Forgot Password`, `Reset Password` integrated with `AuthProvider` automatically.

### Buttons

For example, `@refinedev/antd` package exports `CreateButton`, for redirecting the user to the create page of the resource.

While the button itself is imported from `antd` package, **refine** adds some capabilities to it:

- Routing: when the button is clicked, the user will be redirected to the create page of the resource.
- Access Control: if current user isn't authorized, this button will be disabled or hidden automatically.
- Translation: the button's text will be translated to the current language of the user.

### Hooks

Another example is, `useTable` hook from `@refinedev/antd` package. This hook uses `@refinedev/core`'s `useTable` under the hood, but returns props compatible with `antd`'s `Table` component. So you don't need to manually map the props.

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
