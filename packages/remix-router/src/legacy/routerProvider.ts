import type { IRouterProvider } from "@refinedev/core";
import { Link, useLocation, useNavigate } from "@remix-run/react";

import { Prompt } from "./prompt";
import { useParams } from "./useParams";

export const RouterProvider: IRouterProvider = {
  useHistory: () => {
    const navigate = useNavigate();

    return {
      push: navigate,
      replace: (path: string) => {
        navigate(path, { replace: true });
      },
      goBack: () => {
        navigate(-1);
      },
    };
  },
  useLocation: () => {
    const location = useLocation();

    return location;
  },
  useParams,
  Prompt,
  Link,
};
