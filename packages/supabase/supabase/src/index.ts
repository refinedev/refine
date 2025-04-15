import { createClient } from "@supabase/supabase-js";
import {} from "@supabase/supabase-js/dist/main/lib/types";
import type {
  SupabaseClient,
  User,
  AuthApiError,
  OAuthResponse,
  AuthResponse,
  SignUpWithPasswordCredentials,
  UserResponse,
  AuthError,
} from "@supabase/supabase-js";

import { dataProvider, generateSupabaseDataProvider } from "./dataProvider";
import { generateSupabaseStorageProvider } from "./dataProvider/storage";
import { generateSupabaseEdgeFunctionProvider } from "./dataProvider/edge-functions";
import {
  supabaseIdentityDataProvider,
  type IdentityProviderConfig,
  type IdentityRecord,
  type LinkIdentityVariables,
} from "./dataProvider/identities";
import {
  createAuthProvider,
  type AuthProviderConfig,
  type SupabaseAuthProvider,
  type AuthProviderOptions,
} from "./authProvider";
import {
  accessControlProvider,
  type AccessControlProvider,
} from "./accessControl";
import { liveProvider } from "./liveProvider";

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
