---
title: Implementing Role Based Access Control
description: We'll implement Role Based Access Control (RBAC)
slug: refine-pixels-6
authors: abdullah_numan
tags: [refine-week, refine, supabase ,access-control]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-19-refine-pixels-6%2Fsocial.png
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code examples in this post have been updated to version 4.x.x.

:::


In this post, we implement Role Based Access Control (RBAC) on our **Pixels Admin** app. **Pixels Admin** serves as the admin dashboard of our **Pixels** client app that we built previously in the [**refineWeek**](https://refine.dev/week-of-refine/) series.

This is Day 6, and **refineWeek** is a seven-part tutorial that aims to help developers learn the ins-and-outs of [**refine**'](https://github.com/refinedev/refine)s powerful capabilities and get going with **refine** within a week.

### refineWeek series
- Day 1 - [Pilot & refine architecture](https://refine.dev/blog/refine-pixels-1/)
- Day 2 - [Setting Up the Client App](https://refine.dev/blog/refine-pixels-2/)
- Day 3 - [Adding CRUD Actions and Authentication](https://refine.dev/blog/refine-pixels-3/)
- Day 4 - [Adding Realtime Collaboration](https://refine.dev/blog/refine-pixels-4/)
- Day 5 - [Creating an Admin Dashboard with refine](https://refine.dev/blog/refine-pixels-5/)
  

## Overview

On Day 5, we implemented CRUD functionalities on our dashboard resources: `users` and `canvases`.

Taking it farther today, we add authorization for actions related to `canvases` resource at `/canvases` route. We have have two roles that seek authorization: `editor` and `admin`. An `editor` is allowed to only promote and unpromote a `canvas`, whereas  an `admin` is free to promote / unpromote a `canvas` as well as delete it. Here's a short description of the specs:

1. `editor` can promote and unpromote a canvas.
2. `editor` cannot perform any other action.
3. `admin` can promote and unpromote a canvas.
4. `admin` can delete a canvas.
5. `admin` cannot perform any other action.

We manage RBAC and authorization using [**Casbin**](https://casbin.org/docs/overview) models and policies. We then make use of **refine**'s `accessControlProvider` and associated hooks to enforce policies for these roles.

For the backend, we set and store `user` roles with the help of **Supabase Custom Claims**. **Supabase Custom Claims** are a handy mechanism to store user roles information on the `auth.users` table.

We also dig into some low level code in the `<DeleteButton />` component that **refine**'s **Ant Design** package gives us to see how authorization comes baked into some of the related components.

Let's start with **Casbin**.


## Casbin with **refine**

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

```bash
yarn add casbin
```

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

### Browser Fallbacks for Casbin

We need to configure polyfills for `casbin` to work in a browser environment. We are using `react-app-rewired` to override some of the configurations of our app. So, let's first add the following to `package.json`:

```node
yarn add react-app-rewired
```

And update the scripts:

```json title="package.json"
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "eject": "react-scripts eject",
    "refine": "refine"
 },
```

After that add the following packages:

```
yarn add assert buffer crypto-browserify stream-browserify

yarn add -D https-browserify os-browserify path stream-http
```

And then include this [`config-overrides.js`](https://github.com/anewman15/refine/blob/pixels-admin/examples/pixels-admin/config-overrides.js) file to the root of the app folder.

Without these overrides, `casbin` versions `>5` is known to throw errors.

With this out of the way and the **Casbin** model policies ready, it's time for us to define the `accessControlProvider`.


## `<Refine />`'s `accessControlProvider`

`<Refine />`'s `accessControlProvider` is responsible for enforcing authorization on every request sent from the app. If we look at the `<App />` component, we can see that it comes passed to the `<Refine />` component with the boilerplate code:

```tsx title="src/App.tsx"
...
<Refine
	accessControlProvider={accessControlProvider}
/>
...
```

### **refine** `can` Method

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

Let's now work on the `can` method. We can see from the type definition that `resource` and `action` are compulsory. Initially we define our `can` method like this:

```tsx title="src/providers/accessControlProvider.ts" 
import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";
import { adapter, model } from "../casbin/accessControl";
import { supabaseClient } from "utility";

export const accessControlProvider = {
  can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
    const enforcer = await newEnforcer(model, adapter);
    const can = await enforcer.enforce("admin", resource, action);

    return Promise.resolve({
      can,
    });
  }
};
```

We will modify this gradually to witness the functionality facilitated out-of-the-box by **refine** for each role defined in the policies. We will finalize it after we update the `getPermissions()` method in **Supabase** `authProvider`.

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


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-19-refine-pixels-6%2Ffirst.png"  alt="react admin dashboard" />

</div>

<br />

This is because now our policy for `editor` has taken effect.

The `Delete` button gets disabled because `@refinedev/antd`'s special buttons like the `<DeleteButton />` are enabled or disabled based on the result of access control enforcement. Our `editor` policies do not allow a `delete` action on `canvases` resource, so the `Delete` button is disabled.

Visit [this section](https://refine.dev/docs/api-reference/core/providers/accessControl-provider/#buttons) of the [`accessControlProvider` API reference](https://refine.dev/docs/api-reference/core/providers/accessControl-provider/) for the complete list of buttons that check for and depend on user authorization state in **refine**.

At this point, we have manipulated the role with changes in our code. This should, however, come from the `authProvider`'s `getPermissions()` method.

So, let's look how to get the roles from our **Supabase** database next.


## User Permissions with Supabase in Refine

In **refine**, user roles are fetched by `authProvider`'s `getPermissions()` method. It is already defined for us by `@refinedev/supabase`. Right now, it looks like this:

```tsx title="src/providers/authProvider.ts"
getPermissions: async () => {
	const user = supabaseClient.auth.user();

	if (user) {
		return Promise.resolve(user.role);
	}
},
```

However, **Supabase** in itself does not support **setting** user roles to `user`s in the `auth.users` table. So, it is not possible to set `editor` and `admin` roles we need for our designated users. And only two role options are available to the front end app: `authenticated` and `anon`.

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


### **refine** `getPermissions()` with Supabase Custom Claims

Here's the adjusted `getPermissions()` method:

```tsx title="providers/dataProvider.ts"
getPermissions: async () => {
	const user = supabaseClient.auth.user();

	if (!user) {
		return Promise.reject();
	}

	const { data } = await supabaseClient.rpc('get_my_claim', { claim: 'role' });
	return Promise.resolve(data);
},
```

Here, we are basically using the `supabaseClient.rpc()` method to call the `get_my_claims` SQL function remotely.


## refine `can` Method for Supabase Custom Roles
And now, we can finalize our `can` method with `role` received from `authProvider.getPermissions()`:

```tsx title="providers/accessControlProvider.ts"
export const accessControlProvider = {
	can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
		const role = await authProvider.getPermissions();

		const enforcer = await newEnforcer(model, adapter);
		const can = await enforcer.enforce(role, resource, action);

		return Promise.resolve({
			can,
		});
	}
};
```

Earlier on, we have set `admin` and `editor` roles for a few designated users using the **Supabase** SQL Editor. Now, logging into their respective accounts will display the dashboard with **Casbin** policies applied.

In the `/canvases` route, an `editor` account should have the `Delete` buttons disabled because we don't have it in our policies.

In contrast, it is enabled for an `admin` role:


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-19-refine-pixels-6%2Fsecond.png"  alt="react admin dashboard" />

</div>

<br />

But, wait! We haven't used the `useCan()` hook or the `<CanAccess />` component anywhere yet. How does **refine** get the value of `role` to decide whether to enable or disable the button? Let's find out next!


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

In this post, we implemented Role Based Access Control on `users` and `canvases` resources using **refine**'s `accessControlProvider` in our **Pixels Admin** app.

We used **Casbin** model and policies to enforce authorization for `editor` and `admin` roles. We saw how the `accessControlProvider.can` method is used to enforce **Casbin** policies based on roles fetched from the backend using the `authProvider.getPermissions` method. We also learned how **refine-antd** buttons like the `<DeleteButton />` implements access control via the `useCan()` access hook.

In the next episode, we will explore the `auditLogProvider` prop and add audit logging for `pixels` activities to both our **Pixels** and **Pixels Admin** apps.