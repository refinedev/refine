---
"@pankod/refine-supabase": major
---

Updated `supabase-js` to v2. `supabase` has published a [migration guide](https://supabase.com/docs/reference/javascript/v1/upgrade-guide). These are some of the changes to `refine`.

-   Changed `supabaseClient` initialization:

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

-  Changed authorization methods:

  Many [authorization methods](https://supabase.com/docs/reference/javascript/v1/upgrade-guide#auth-methods) have changed. Updated them in the example application. You can check it out [here](https://github.com/refinedev/refine/pull/3528/commits/3ac9ec9c73fdc0d406891a8b7e38ce7990bb5a1b).



