---
title: Implementing Role Based Access Control
description: We'll implement Role Based Access Control (RBAC)
slug: refine-pixels-6
authors: abdullah_numan
tags: [refine-week, Refine, supabase, access-control]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-19-refine-pixels-6%2Fsocial.png
hide_table_of_contents: false
---

In this post, we implement Role Based Access Control (RBAC) on our **Pixels Admin** app. **Pixels Admin** serves as the admin dashboard of our **Pixels** client app that we built previously in the [**RefineWeek**](https://refine.dev/week-of-refine/) series.

This is Day 6, and **RefineWeek** is a seven-part tutorial that aims to help developers learn the ins-and-outs of [**Refine**'](https://github.com/refinedev/refine)s powerful capabilities and get going with **Refine** within a week.

### RefineWeek series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-pixels-1/)
- Day 2 - [Setting Up the Client App](https://refine.dev/blog/refine-pixels-2/)
- Day 3 - [Adding CRUD Actions and Authentication](https://refine.dev/blog/refine-pixels-3/)
- Day 4 - [Adding Realtime Collaboration](https://refine.dev/blog/refine-pixels-4/)
- Day 5 - [Creating an Admin Dashboard with Refine](https://refine.dev/blog/refine-pixels-5/)
- Day 6 - [Implementing Role Based Access Control](https://refine.dev/blog/refine-pixels-6/)
- Day 7 - [Audit Log With Refine](https://refine.dev/blog/refine-pixels-7/)

## Overview

On Day 5, we implemented CRUD functionalities on our dashboard resources: `users` and `canvases`.

Taking it farther today, we add authorization for actions related to `canvases` resource at `/canvases` route. We have have two roles that seek authorization: `editor` and `admin`. An `editor` is allowed to only promote and unpromote a `canvas`, whereas an `admin` is free to promote / unpromote a `canvas` as well as delete it. Here's a short description of the specs:

1. `editor` can promote and unpromote a canvas.
2. `editor` cannot perform any other action.
3. `admin` can promote and unpromote a canvas.
4. `admin` can delete a canvas.
5. `admin` cannot perform any other action.

We manage RBAC and authorization using [**Casbin**](https://casbin.org/docs/overview) models and policies. We then make use of **Refine**'s `accessControlProvider` and associated hooks to enforce policies for these roles.

For the backend, we set and store `user` roles with the help of **Supabase Custom Claims**. **Supabase Custom Claims** are a handy mechanism to store user roles information on the `auth.users` table.

We also dig into some low level code in the `<DeleteButton />` component that **Refine**'s **Ant Design** package gives us to see how authorization comes baked into some of the related components.

Let's start with **Casbin**.

## Casbin with **Refine**

In this app, we are implementing Role Based Access Control model with **Casbin** so we assume you are at least familiar with the RBAC related models and policies.

If you are not familiar with **Casbin**, please feel free to go through [how it works](https://casbin.org/docs/how-it-works). For a complete beginner, I recommend understanding the following sections in the **Casbin** docs:

1. [Get Started](https://casbin.org/docs/get-started)
2. [How It Works](https://casbin.org/docs/how-it-works)
3. [Supported Models](https://casbin.org/docs/supported-models)
4. [Syntax for Models](https://casbin.org/docs/syntax-for-models)
5. [Model Storage](https://casbin.org/docs/model-storage)
6. [Policy Storage](https://casbin.org/docs/policy-storage)
7. [Enforcers](https://casbin.org/docs/enforcers)
8. [Adapters](https://casbin.org/docs/adapters)
9. [Role Managers](https://casbin.org/docs/role-managers)
10. [RBAC](https://casbin.org/docs/rbac)

If / when you are familiar, lovely yay! Be with me, go ahead and install **Casbin**:

### Casbin Installation

```bash
npm install casbin
```

#### Browser Fallbacks for Casbin

We need to configure polyfills for `vite` to work in a browser environment.

Let's first install required packages:

```node
npm install -D rollup-plugin-polyfill-node @esbuild-plugins/node-modules-polyfill @esbuild-plugins/node-globals-polyfill
```

After that we need to add the following to the `vite.config.ts` file:

```tsx title="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
```

Without these overrides, `casbin` versions `>5` is known to throw errors.

With this out of the way and the **Casbin** model policies ready, it's time for us to define the `accessControlProvider`.

### Casbin Model and Policies

We are using the following `model` and policy `adapter` for our RBAC implementation:

```tsx title="src/casbin/accessControl.ts"
import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
  [request_definition]
  r = sub, obj, act

  [policy_definition]
  p = sub, obj, act

  [role_definition]
  g = _, _

  [policy_effect]
  e = some(where (p.eft == allow))

  [matchers]
  m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
  p, admin, users, list
  p, admin, canvases, (list)|(edit)|(delete)

  p, editor, users, list
  p, editor, canvases, (list)|(edit)
`);
```

A quick run down of the `model` is:

- with the request definition in `r = sub, obj, act`, **Casbin** scans the request for the subject (`editor` or `admin`), object (the `resource`) and the action (`get`, `create`, `edit`, etc.).
- with the same parameters in `p = sub, obj, act`, it compares the request parameters with those in the policy instances declared in the policy adapter
- with the two level grouping in `g = _, _`, we are declaring user role inheritance can go two levels deep, i.e. an `admin` is an `user`.

The `adapter` holds our instances of policies produced from `p`. The policies above basically allows:

- an `admin` to `list` users.
- an admin to `list`, `edit` and `delete` canvases.
- an `editor` to `list` users.
- an `editor` to `list` and `edit` canvases.

## `<Refine />`'s `accessControlProvider`

`<Refine />`'s `accessControlProvider` is responsible for enforcing authorization on every request sent from the app. If we look at the `<App />` component, we can see that it comes passed to the `<Refine />` component with the boilerplate code:

```tsx title="src/App.tsx"
...
<Refine
	accessControlProvider={accessControlProvider}
/>
...
```

### **Refine** `can` Method

The `accessControlProvider` implements only one method named `can`. It has the following type signature:

```tsx
type CanParams = {
  resource: string;
  action: string;
  params?: {
    resource?: IResourceItem;
    id?: BaseKey;
    [key: string]: any;
  };
};
```

Let's now work on the `can` method. We can see from the type definition that `resource` and `action` are compulsory.

Basic implementation of `can` method looks like this:

[Refer to the Access Control Provider documentation for more information. → ](/docs/api-reference/core/providers/accessControl-provider/)

```tsx title="src/providers/accessControlProvider.ts"
import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";
import { adapter, model } from "../casbin/accessControl";

export const accessControlProvider = {
  can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
    const enforcer = await newEnforcer(model, adapter);
    const can = await enforcer.enforce("admin", resource, action);

    return Promise.resolve({
      can,
    });
  },
};
```

We will modify this gradually to witness the functionality facilitated out-of-the-box by **Refine** for each role defined in the policies. We will finalize it after we update the `getPermissions()` method in **Supabase** `authProvider`.

But for now, notice in the above definition that we are passing the compulsory `resource` and `action` parameters to `can`. We expect the `useCan()` access control hook to take these two arguments.

For more use cases and implementations of `can`, feel free to go through the elaborate examples in [this definitive and guiding post](https://refine.dev/docs/advanced-tutorials/access-control/).

In the above code, we are initializing a **Casbin** `Enforcer` with the `model` and `adapter`. We want this `enforcer` to enforce the policies with its accepted arguments. At the end, we get the `Boolean` decision based on the model's policy effect.

From inside a component, the `accessControlProvider.can` method will be invoked via the [`useCan()` hook](https://refine.dev/docs/api-reference/core/hooks/accessControl/useCan/).

With this code now, there should be no change in our UI. That is, we should be able to view the contents of both our `/users` and `/canvases` resources like they were before. When we visit the `/canvases` route, we should have all the buttons displayed.

We expect this behavior to change when we change the role. In the `can` method above let's set the first argument of `enforcer.enforce()` to `"editor"`:

```tsx
const can = await enforcer.enforce("editor", resource, action);
```

And if we refresh at `/canvases`, we can see that the `Delete` button on each row gets disabled.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/can-access-disabled.jpg"  alt="react supabase CRUD App" />

<br />

This is because now our policy for `editor` has taken effect.

The `Delete` button gets disabled because `@refinedev/antd`'s special buttons like the `<DeleteButton />` are enabled or disabled based on the result of access control enforcement. Our `editor` policies do not allow a `delete` action on `canvases` resource, so the `Delete` button is disabled.

Visit [this section](https://refine.dev/docs/api-reference/core/providers/accessControl-provider/#buttons) of the [`accessControlProvider` API reference](https://refine.dev/docs/api-reference/core/providers/accessControl-provider/) for the complete list of buttons that check for and depend on user authorization state in **Refine**.

At this point, we have manipulated the role with changes in our code. This should, however, come from the `authProvider`'s `getPermissions()` method.

So, let's look how to get the roles from our **Supabase** database next.

## User Permissions with Supabase in Refine

In **Refine**, user roles are fetched by `authProvider`'s `getPermissions()` method. It is already defined for us by `@refinedev/supabase`.

When you bootstraped **Refine** app with CLI, the default `getPermissions` method in `authProvider` looks like below:

```tsx title="src/providers/authProvider.ts"
getPermissions: async () => {
  const user = await supabaseClient.auth.getUser();

  if (user) {
    return user.data.user?.role;
  }

  return null;
};
```

However, **Supabase** in itself does not support **setting** user roles to `users` in the `auth.users` table. So, it is not possible to set `editor` and `admin` roles we need for our designated users. And only two role options are available to the front end app: `authenticated` and `anon`.

So, before we can use the `getPermissions()` method, we have to set up custom user roles. One way to implement this is with [**Supabase Custom Claims**](https://github.com/supabase-community/supabase-custom-claims).

### Setting Up User Roles with Supabase Custom Claims

**Supabase Custom Claims** is a community contribution that enables setting additional data to the access token that a user receives from **Supabase**. These claims are stored in the `auth.users.raw_app_meta_data` field and is sent to the client with the access token. We are going to use these custom claims to set and retrieve user roles for our app.

**Supabase** does not support custom claims on its own. Due credits to [@burggraf](https://github.com/burggraf), they are enabled by installing a number of functions on our database. These functions allow us to set and get custom claims for a particular user in the `auth.users` table.

Here are two crucial particulars on how they work:

- Only a user with a `{ claims_admin: true }` claim can set claims data on others. So we need to bootstrap a `claims_admin` role for a first user using the **Supabase** SQL Editor.
- Our app can access the getter and setter functions via **Supabase** Remote Procedure Calls (RPCs) with the `supabaseClient.rpc()` method.

With these in mind, let's go ahead and set up **Supabase Custom Claims** on our database.

**Installing Custom Claims Functions**

Let's start with installing the custom claims SQL functions. Copy, paste and run the [install.sql](https://github.com/supabase-community/supabase-custom-claims/blob/main/install.sql) script in your **Supabase** SQL Editor.

Take a note of the function named `get_my_claims()`:

```sql title="https://github.com/supabase-community/supabase-custom-claims/blob/main/install.sql"
CREATE OR REPLACE FUNCTION get_my_claims() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
```

This SQL function will help us to remotely get user roles for our app. And we are going to call it from our `getPermissions()` method. To understand the details, please read through the [**Supabhase Custom Claims** page](https://github.com/supabase-community/supabase-custom-claims#getting-claims-data-from-the-server).
<br />

**Bootstrapping Claims Admin Role**

We then have to bootstrap a `claims_admin` role because only users with `{ claims_admin: true }` can set claims data for other users. This is necessary for security of the claims admin feature, and not for our app code. So, in the **Supabase** SQL Editor run the following query:

```sql
select set_claim('designated-user-uuid', 'claims_admin', 'true');
```

This will allow the user with id `designated-user-uuid` to set roles for other users from inside our app.

We can also set other data from the SQL Editor, such as the role itself. Let's use the following SQL query to set roles for some of our designated users. Doing so will help us in the coming sections:

```sql
select set_claim('designated-user-uuid', 'role', '"editor"');
select set_claim('another-designated-user-uuid', 'role', '"admin"');
```

We need to take special care about using the correct quotations. More on this [in this section](https://github.com/supabase-community/supabase-custom-claims#set_claimuid-uuid-claim-text-value-jsonb-returns-text).

With these done, we are ready to update our `getPermissions()` and `can` methods.

### **Refine** `getPermissions()` with Supabase Custom Claims

Here's the adjusted `getPermissions()` method:

```tsx title="providers/dataProvider.ts"
getPermissions: async () => {
    try {
        const { error } = await supabaseClient.auth.getUser();

        if (error) {
            console.error(error);
            return;
        }

        const { data } = await supabaseClient.rpc("get_my_claim", {
            claim: "role",
        });

        return data;
    } catch (error: any) {
        console.error(error);
        return;
    }
},
```

Here, we are basically using the `supabaseClient.rpc()` method to call the `get_my_claims` SQL function remotely.

## Refine `can` Method for Supabase Custom Roles

And now, we can finalize our `can` method with `role` received from `authProvider.getPermissions()`:

```tsx title="providers/accessControlProvider.ts"
import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";

import { adapter, model } from "../casbin/accessControl";
import { authProvider } from "./authProvider";

export const accessControlProvider = {
  can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
    const role = await authProvider.getPermissions?.();

    const enforcer = await newEnforcer(model, adapter);
    const can = await enforcer.enforce(role, resource, action);

    return Promise.resolve({
      can,
    });
  },
};
```

Earlier on, we have set `admin` and `editor` roles for a few designated users using the **Supabase** SQL Editor. Now, logging into their respective accounts will display the dashboard with **Casbin** policies applied.

In the `/canvases` route, an `editor` account should have the `Delete` buttons disabled because we don't have it in our policies.

In contrast, it is enabled for an `admin` role:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-02-18-refine-pixels-5/can-access-enabled.jpg"  alt="react supabase CRUD App" />

<br />

But, wait! We haven't used the `useCan()` hook or the `<CanAccess />` component anywhere yet. How does **Refine** get the value of `role` to decide whether to enable or disable the button? Let's find out next!

## Low Level Inspection

If we dig into the `@refinedev/antd` package for the `<DeleteButton />` component, we can see that `useCan()` hook is used to decide the authorization status:

```tsx title="node_modules/@refinedev/antd/src/components/buttons/delete/index.ts"
export const DeleteButton: React.FC<DeleteButtonProps> = ({
	...
}) => {
	...

	const { data } = useCan({
		resource: resourceName,
		action: "delete",
		params: { id, resource },
		queryOptions: {
				enabled: accessControlEnabled,
		},
	});

	if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
		return null;
	}

	...
};
```

Since authorization comes baked in with `<DeleteButton />`, we didn't have to worry about it in our case.

## Summary

In this post, we implemented Role Based Access Control on `users` and `canvases` resources using **Refine**'s `accessControlProvider` in our **Pixels Admin** app.

We used **Casbin** model and policies to enforce authorization for `editor` and `admin` roles. We saw how the `accessControlProvider.can` method is used to enforce **Casbin** policies based on roles fetched from the backend using the `authProvider.getPermissions` method. We also learned how **refine-antd** buttons like the `<DeleteButton />` implements access control via the `useCan()` access hook.

In the next episode, we will explore the `auditLogProvider` prop and add audit logging for `pixels` activities to both our **Pixels** and **Pixels Admin** apps.

[Click here to read "Audit Log With Refine" article. &#8594](https://refine.dev/blog/refine-pixels-7/)
