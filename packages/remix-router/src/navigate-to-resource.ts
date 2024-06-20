import { useResource, useGetToPath } from "@refinedev/core";
import React, { type PropsWithChildren } from "react";
import { useNavigate } from "@remix-run/react";

type NavigateToResourceProps = PropsWithChildren<{
  resource?: string;
  meta?: Record<string, unknown>;
}>;

export const NavigateToResource: React.FC<NavigateToResourceProps> = ({
  resource: resourceProp,
  meta,
}) => {
  const ran = React.useRef(false);
  const navigate = useNavigate();
  const getToPath = useGetToPath();
  const { resource, resources } = useResource(resourceProp);

  const toResource = resource || resources.find((r) => r.list);

  React.useEffect(() => {
    if (toResource) {
      if (!ran.current) {
        const path = getToPath({
          resource: toResource,
          action: "list",
          meta,
        });

        if (path) {
          navigate(path, { replace: true });
        }
        ran.current = true;
      }
    }
  }, [toResource, meta, navigate, getToPath]);

  return null;
};
