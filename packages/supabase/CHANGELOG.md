# @pankod/refine-supabase

## 4.0.0

### Major Changes

-   [#3528](https://github.com/refinedev/refine/pull/3528) [`e8b34442521`](https://github.com/refinedev/refine/commit/e8b3444252146150fb7fc03a73e8926a68005194) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated `supabase-js` to v2. `supabase` has published a [migration guide](https://supabase.com/docs/reference/javascript/v1/upgrade-guide). These are some of the changes to `refine`.

    -   Create Supabase client:

    Before:

    ```ts
    import { createClient } from "@supabase/supabase-js";

    export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    ```

    After:

    ```ts
    import { createClient } from "@supabase/supabase-js";

    export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
        db: {
            schema: "public",
        },
        auth: {
            persistSession: true,
        },
    });
    ```

    -   Sign In method:

    Before:

    ```ts
    const { user, error } = await supabaseClient.auth.signIn({
        email,
        password,
        provider: providerName,
    });
    ```

    After:

    ```ts
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });
    ```

    with OAuth:

    ```ts
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: providerName,
    });
    ```

    -   Sign Up method:

    Before:

    ```ts
    const { user, error } = await supabaseClient.auth.signUp({
        email,
        password,
    });
    ```

    After:

    ```ts
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
    });
    ```

    -   Reset Password with Email

        Before:

        ```ts
        const { data, error } =
            await supabaseClient.auth.api.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            });
        ```

        After:

        ```ts
        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/update-password`,
            },
        );
        ```

    -   Update User

    Before:

    ```ts
    const { data, error } = await supabaseClient.auth.update({
        password,
    });
    ```

    After:

    ```ts
    const { data, error } = await supabaseClient.auth.updateUser({
        password,
    });
    ```

    -   Get Sesssion

    Before:

    ```ts
    const session = supabaseClient.auth.session();
    ```

    After:

    ```ts
    const { data, error } = await supabaseClient.auth.getSession();
    ```

    -   Get User

        Before:

        ```ts
        const user = supabaseClient.auth.user();
        ```

        After:

        ```ts
        const { data, error } = await supabaseClient.auth.getUser();
        ```

## 3.35.0

### Minor Changes

-   Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

    ```
    {
      operator: "or",
      value: [
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "John Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 30,
            },
          ],
        },
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "JR Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 1,
            },
          ],
        },
      ],
    }
    ```

## 3.34.0

### Minor Changes

-   [#2751](https://github.com/refinedev/refine/pull/2751) [`addff64c77`](https://github.com/refinedev/refine/commit/addff64c777e4c9f044a1a109cb05453e6e9f762) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

    ```
    {
      operator: "or",
      value: [
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "John Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 30,
            },
          ],
        },
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "JR Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 1,
            },
          ],
        },
      ],
    }
    ```

## 3.33.0

### Minor Changes

-   Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 3.32.0

### Minor Changes

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 3.31.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.30.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.29.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.28.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.27.0

### Minor Changes

-   Add `foreignTable` propery to the **supabase** order statement to access relational data. For more information, you can check the 🔗[documentation](https://supabase.com/docs/reference/javascript/order).

    What we added to the [`getlist`](https://github.com/refinedev/refine/blob/master/packages/supabase/src/index.ts) hook is the following:

    💡 How use the `foreignTable` property?

    ```tsx
    ...
    const { tableProps } = useTable({
        resource: "posts",
        initialSorter: [
            {
                field: "categories.title",
                order: "asc",
            },
        ],
    });
    ```

    📢 `field: "categories.title"` means in the `posts` table `categories` is the foreign table, `title` is the field in the foreign table, and `asc` is the order.

    🚨 If you are using **Ant Design** don't forget to pass the `sorter` and `dataIndex` property to the your `Columm` component:

    ```tsx
    ...
    <Table.Column
        dataIndex={["categories", "title"]}
        title="Categories"
        sorter
    ```

    > **Warning**
    > We have developed this feature due to an [issue here](https://github.com/refinedev/refine/issues/2066) but currently, **supabase** doesn't support it. You can follow the progress here 👇

    -   [https://github.com/supabase/supabase/discussions/4255](https://github.com/supabase/supabase/discussions/4255)
    -   [https://github.com/supabase/postgrest-js/issues/198](https://github.com/supabase/postgrest-js/issues/198)

## 3.26.0

### Minor Changes

-   [#2087](https://github.com/refinedev/refine/pull/2087) [`62f1e6256d`](https://github.com/refinedev/refine/commit/62f1e6256dcbe39413b428744cbabe554de696fc) Thanks [@biskuvit](https://github.com/biskuvit)! - Add `foreignTable` propery to the **supabase** order statement to access relational data. For more information, you can check the 🔗[documentation](https://supabase.com/docs/reference/javascript/order).

    What we added to the [`getlist`](https://github.com/refinedev/refine/blob/master/packages/supabase/src/index.ts) hook is the following:

    💡 How use the `foreignTable` property?

    ```tsx
    ...
    const { tableProps } = useTable({
        resource: "posts",
        initialSorter: [
            {
                field: "categories.title",
                order: "asc",
            },
        ],
    });
    ```

    📢 `field: "categories.title"` means in the `posts` table `categories` is the foreign table, `title` is the field in the foreign table, and `asc` is the order.

    🚨 If you are using **Ant Design** don't forget to pass the `sorter` and `dataIndex` property to the your `Columm` component:

    ```tsx
    ...
    <Table.Column
        dataIndex={["categories", "title"]}
        title="Categories"
        sorter
    ```

    > **Warning**
    > We have developed this feature due to an [issue here](https://github.com/refinedev/refine/issues/2066) but currently, **supabase** doesn't support it. You can follow the progress here 👇

    -   [https://github.com/supabase/supabase/discussions/4255](https://github.com/supabase/supabase/discussions/4255)
    -   [https://github.com/supabase/postgrest-js/issues/198](https://github.com/supabase/postgrest-js/issues/198)

## 3.25.2

### Patch Changes

-   Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.25.1

### Patch Changes

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
