import React from "react";
import { useNavigate } from "react-router";
import { logoutUser } from "src/utils/auth";
import { getMe } from "src/utils/me";

export const Onboarded = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [onboarding, setOnboarding] = React.useState<
    "loading" | "success" | "missing"
  >("loading");

  const checkOnboarding = React.useCallback(async () => {
    try {
      const meResponse = await getMe();
      if (meResponse?.company && meResponse?.name && meResponse?.jobTitle) {
        setOnboarding("success");
      } else if (meResponse !== null) {
        setOnboarding("missing");
      } else {
        logoutUser().then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 100);
        });
      }
    } catch (_error) {
      setOnboarding("success");
    }
  }, []);

  React.useEffect(() => {
    checkOnboarding();
  }, [checkOnboarding]);

  if (onboarding === "missing") {
    return <>{fallback}</>;
  }

  if (onboarding === "success") {
    return <>{children}</>;
  }

  return null;
};
