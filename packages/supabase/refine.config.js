/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
  group: "Data Provider",
  swizzle: {
    items: [
      {
        group: "Providers",
        label: "Supabase",
        requiredPackages: ["@supabase/supabase-js@2.7.0"],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/supabase/index.ts",
          },
          {
            src: "./src/dataProvider/index.ts",
            dest: "./providers/supabase/dataProvider/index.ts",
          },
          {
            src: "./src/liveProvider/index.ts",
            dest: "./providers/supabase/liveProvider/index.ts",
          },
          {
            src: "./src/types/index.ts",
            dest: "./providers/supabase/types/index.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/supabase/utils/index.ts",
          },
          {
            src: "./src/utils/generateFilter.ts",
            dest: "./providers/supabase/utils/generateFilter.ts",
          },
          {
            src: "./src/utils/handleError.ts",
            dest: "./providers/supabase/utils/handleError.ts",
          },
          {
            src: "./src/utils/mapOperator.ts",
            dest: "./providers/supabase/utils/mapOperator.ts",
          },
        ],
        message: `
                    **\`Usage\`**

                    \`\`\`
                    // title: App.tsx
                    import { dataProvider, liveProvider, createClient } from "providers/supabase";

                    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
                      /* ... */
                    });
                  
                    const App = () => {
                        return (
                            <Refine
                                dataProvider={dataProvider(supabaseClient)}
                                liveProvider={liveProvider(supabaseClient)}
                                /* ... */
                            />
                        );
                    }
                    \`\`\`
                    `,
      },
      {
        group: "Providers",
        label: "Supabase - Auth",
        requiredPackages: ["@supabase/supabase-js@^2"],
        files: [
          {
            src: "./src/authProvider/index.ts",
            dest: "./providers/supabase/authProvider.ts",
          },
          {
            src: "./src/accessControl/index.ts",
            dest: "./providers/supabase/accessControlProvider.ts",
          },
          // Add other necessary auth files if any, e.g., utils used by authProvider
        ],
        message: `
          **\`Usage\`**

          \`\`\`
          // title: App.tsx
          import { createAuthProvider, accessControlProvider, createClient } from "providers/supabase";

          const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
            /* ... */
          });

          const authProvider = createAuthProvider(supabaseClient);

          const App = () => {
              return (
                  <Refine
                      authProvider={authProvider}
                      accessControlProvider={accessControlProvider(authProvider)}
                      /* ... */
                  />
              );
          }
          \`\`\`
          `,
      },
      {
        group: "Providers",
        label: "Supabase - Identities",
        requiredPackages: ["@supabase/supabase-js@^2"],
        files: [
          {
            src: "./src/dataProvider/identities.ts",
            dest: "./providers/supabase/identityProvider.ts",
          },
        ],
        message: `
          **\`Usage\`**

          \`\`\`
          // title: App.tsx
          import { supabaseIdentityDataProvider, dataProvider, createClient } from "providers/supabase";

          const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
            /* ... */
          });

          const App = () => {
              return (
                  <Refine
                      dataProvider={{
                        default: dataProvider(supabaseClient),
                        identities: supabaseIdentityDataProvider(supabaseClient),
                      }}
                      /* ... */
                  />
              );
          }
          \`\`\`
          `,
      },
      {
        group: "Providers",
        label: "Supabase - Storage",
        requiredPackages: ["@supabase/supabase-js@^2"],
        files: [
          {
            src: "./src/dataProvider/storage.ts",
            dest: "./providers/supabase/storageProvider.ts",
          },
          // Add other necessary storage files if any, e.g., utils used by storageProvider
        ],
        message: `
          **\`Usage\`**

          \`\`\`
          // title: App.tsx
          import { generateSupabaseStorageProvider, createClient } from "providers/supabase";

          const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
            /* ... */
          });

          const App = () => {
              return (
                  <Refine
                      dataProvider={{
                        default: dataProvider(supabaseClient), // Assuming your main data provider
                        storage: generateSupabaseStorageProvider(supabaseClient),
                      }}
                      /* ... */
                  />
              );
          }
          \`\`\`
          `,
      },
      {
        group: "Providers",
        label: "Supabase - Edge Functions",
        requiredPackages: ["@supabase/supabase-js@^2"],
        files: [
          {
            src: "./src/dataProvider/edge-functions.ts",
            dest: "./providers/supabase/edgeFunctionsProvider.ts",
          },
        ],
        message: `
          **\`Usage\`**

          \`\`\`
          // title: App.tsx
          import { generateSupabaseEdgeFunctionProvider, createClient } from "providers/supabase";

          const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
            /* ... */
          });

          const App = () => {
              return (
                  <Refine
                      dataProvider={{
                        default: dataProvider(supabaseClient), // Assuming your main data provider
                        functions: generateSupabaseEdgeFunctionProvider(supabaseClient),
                      }}
                      /* ... */
                  />
              );
          }
          \`\`\`
          `,
      },
      {
        group: "Providers",
        label: "Supabase - RPC",
        requiredPackages: ["@supabase/supabase-js@^2"],
        files: [
          {
            src: "./src/dataProvider/rpc.ts", // Assuming the file exists
            dest: "./providers/supabase/rpcProvider.ts",
          },
        ],
        message: `
          **\`Usage\`**

          \`\`\`
          // title: App.tsx
          import { generateSupabaseRpcProvider, createClient } from "providers/supabase";

          const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
            /* ... */
          });

          const App = () => {
              return (
                  <Refine
                      dataProvider={{
                        default: dataProvider(supabaseClient), // Assuming your main data provider
                        rpc: generateSupabaseRpcProvider(supabaseClient),
                      }}
                      /* ... */
                  />
              );
          }
          \`\`\`
          `,
      },
      {
        group: "Providers",
        label: "Supabase - Full Stack",
        requiredPackages: ["@supabase/supabase-js@^2"],
        files: [
          {
            src: "./src/index.ts",
            dest: "./providers/supabase/index.ts",
          },
          {
            src: "./src/dataProvider/index.ts",
            dest: "./providers/supabase/dataProvider/index.ts",
          },
          {
            src: "./src/liveProvider/index.ts",
            dest: "./providers/supabase/liveProvider/index.ts",
          },
          {
            src: "./src/authProvider/index.ts",
            dest: "./providers/supabase/authProvider.ts",
          },
          {
            src: "./src/accessControl/index.ts",
            dest: "./providers/supabase/accessControlProvider.ts",
          },
          {
            src: "./src/dataProvider/identities.ts",
            dest: "./providers/supabase/identityProvider.ts",
          },
          {
            src: "./src/dataProvider/storage.ts",
            dest: "./providers/supabase/storageProvider.ts",
          },
          {
            src: "./src/dataProvider/edge-functions.ts",
            dest: "./providers/supabase/edgeFunctionsProvider.ts",
          },
          {
            src: "./src/dataProvider/rpc.ts",
            dest: "./providers/supabase/rpcProvider.ts",
          },
        ],
        message: `
          **\`Usage\`**

          \`\`\`
          // title: App.tsx
          import { 
            createClient, 
            dataProvider, 
            liveProvider, 
            createAuthProvider, 
            accessControlProvider,
            supabaseIdentityDataProvider,
            generateSupabaseStorageProvider,
            generateSupabaseEdgeFunctionProvider,
            generateSupabaseRpcProvider
          } from "providers/supabase";

          const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
            /* ... */
          });

          // Create auth provider first to use with access control
          const authProvider = createAuthProvider(supabaseClient);

          const App = () => {
              return (
                  <Refine
                      // Core providers
                      dataProvider={{
                        default: dataProvider(supabaseClient),
                        identities: supabaseIdentityDataProvider(supabaseClient),
                        storage: generateSupabaseStorageProvider(supabaseClient),
                        functions: generateSupabaseEdgeFunctionProvider(supabaseClient),
                        rpc: generateSupabaseRpcProvider(supabaseClient),
                      }}
                      liveProvider={liveProvider(supabaseClient)}
                      
                      // Auth & access control
                      authProvider={authProvider}
                      accessControlProvider={accessControlProvider(authProvider)}
                      /* ... */
                  />
              );
          }
          \`\`\`
          `,
      },
    ],
  },
};
