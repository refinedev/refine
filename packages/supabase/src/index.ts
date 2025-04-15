import { createClient } from "@supabase/supabase-js";
// Re-export all the module exports
export * from "./types/index.js";
export * from "./dataProvider/index.js";
export * from "./authProvider/index.js";
export * from "./accessControl/index.js";
export * from "./liveProvider/index.js";
export * from "./utils/index.js";
export * from "./dataProvider/rpc.js";
export { handleError as edgeFunctionError } from "./dataProvider/edge-functions.js";

// Re-export the base client creation function
export { createClient };

// Export typed interfaces
export type {
  AuthProviderConfig,
  SupabaseAuthProvider,
  AuthProviderOptions,
} from "./authProvider";

export type {
  IdentityProviderConfig,
  IdentityRecord,
  LinkIdentityVariables,
} from "./dataProvider/identities";

// Named exports of providers
export { dataProvider } from "./dataProvider";
export { supabaseIdentityDataProvider } from "./dataProvider/identities";
export { generateSupabaseStorageProvider } from "./dataProvider/storage";
export { generateSupabaseEdgeFunctionProvider } from "./dataProvider/edge-functions";
export { createAuthProvider } from "./authProvider";
export { accessControlProvider } from "./accessControl";
export { liveProvider } from "./liveProvider";
