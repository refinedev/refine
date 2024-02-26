import { useEffect } from "react";
import { useRouterContext } from "@hooks";
import { useLegacyAuthContext } from "@contexts/auth";

export const RouteChangeHandler: React.FC = () => {
  const { useLocation } = useRouterContext();

  const { checkAuth } = useLegacyAuthContext();
  const location = useLocation();

  useEffect(() => {
    checkAuth?.().catch(() => false);
  }, [location?.pathname]);

  return null;
};
