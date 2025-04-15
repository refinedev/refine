import { CanParams } from "@refinedev/core";
import { SupabaseAuthProvider } from "../authProvider";
import { User } from "@supabase/supabase-js";

export const accessControlProvider = (authProvider: SupabaseAuthProvider) => {
  return {
    can: async ({
      resource,
      action,
      params,
    }: CanParams): Promise<{ can: boolean; reason?: string }> => {
      if (!authProvider?.getIdentity) {
        return {
          can: false,
          reason: "AuthProvider or getIdentity method not configured",
        };
      }
      const identity = (await authProvider.getIdentity()) as unknown & User;
      if (!identity) {
        return { can: false, reason: "User not authenticated" };
      }
      if (identity.app_metadata && identity.app_metadata.role === "admin") {
        return { can: true };
      }
      return { can: false, reason: "User not authorized" };
    },
    options: {
      buttons: {
        enableAccessControl: true,
        hideIfUnauthorized: false,
      },
      queryOptions: {
        // ... default global query options
      },
    },
  };
};
