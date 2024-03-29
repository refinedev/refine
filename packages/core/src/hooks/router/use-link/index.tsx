import { RouterContext } from "@contexts/router";
import React, { useContext } from "react";

export const useLink = () => {
  const routerContext = useContext(RouterContext);

  if (routerContext?.Link) {
    return routerContext.Link;
  }

  const FallbackLink: Required<typeof routerContext>["Link"] = ({
    to,
    ...rest
  }) => <a href={to} {...rest} />;

  return FallbackLink;
};
