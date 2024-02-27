import React from "react";
import { isAuthenticated } from "src/utils/auth";

export const Authenticated = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  const [authenticated, setAuthenticated] = React.useState<
    "loading" | "success" | "error"
  >("loading");

  const checkAuth = React.useCallback(async () => {
    try {
      const authStatus = await isAuthenticated();
      if (authStatus) {
        setAuthenticated("success");
      } else {
        setAuthenticated("error");
      }
    } catch (_error) {
      setAuthenticated("error");
    }
  }, []);

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authenticated === "error") {
    return <>{fallback}</>;
  }

  if (authenticated === "success") {
    return <>{children}</>;
  }

  return null;
};
