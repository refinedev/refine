---
"@pankod/refine-supabase": major
---

Updated `supabase-js` to v2. `supabase` has published a [migration guide](https://supabase.com/docs/reference/javascript/v1/upgrade-guide). These are some of the changes to `refine`.

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

-  Sign In method:

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
-  Sign Up method:

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

- Reset Password with Email

  Before:

  ```ts
  const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  });
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email,
    {
      redirectTo: `${window.location.origin}/update-password`,
    },
  );
  ```

-  Update User

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

-  Get Sesssion

  Before:

  ```ts
  const session = supabaseClient.auth.session();
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.getSession();
  ```
  
- Get User

  Before: 

  ```ts
  const user = supabaseClient.auth.user();
  ```
  After: 

  ```ts
  const { data, error } = await supabaseClient.auth.getUser();
  ```

