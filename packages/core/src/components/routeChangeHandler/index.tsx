import { useEffect } from "react";
import { useRouterContext } from "@hooks";
import { useActiveAuthProvider } from "@definitions/index";

export const RouteChangeHandler: React.FC = () => {
  const { useLocation } = useRouterContext();

  const authProvider = useActiveAuthProvider();
  const location = useLocation();

  useEffect(() => {
    authProvider?.check?.().catch(() => false);
  }, [location?.pathname]);

  return null;
};
