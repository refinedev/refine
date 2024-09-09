import type { AuthProvider } from "@refinedev/core";

import { supabaseClient } from "./utility";

const authProvider: AuthProvider = {
  login: async ({ mobileNo, otp }) => {
    const { data, error } = await supabaseClient.auth.verifyOtp({
      phone: mobileNo,
      token: otp,
      type: "sms",
    });

    if (error) {
      return {
        success: false,
        error: error || {
          message: "Login failed",
          name: "Invalid OTP",
        },
      };
    }

    if (data) {
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: { message: "Login failed", name: "Invalid OTP" },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error || {
          message: "Logout failed",
          name: "Invalid OTP",
        },
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    if (error?.code === "PGRST301" || error?.code === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const { data, error } = await supabaseClient.auth.getSession();
    const { session } = data;

    if (!session) {
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Session not found",
        },
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data) {
      return data.user?.role;
    }

    return null;
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();
    const { user } = data;
    if (user) {
      return {
        ...user,
        name: user.email,
      };
    }

    return null;
  },
};

export default authProvider;
