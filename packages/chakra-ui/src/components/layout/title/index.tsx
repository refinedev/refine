import React from "react";
import {
  useRouterContext,
  useRouterType,
  useLink,
  type TitleProps,
} from "@refinedev/core";
import { Link as ChakraLink } from "@chakra-ui/react";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ChakraLink as={ActiveLink} to="/">
      {collapsed ? (
        <img
          src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg"
          alt="Refine"
          style={{ maxHeight: "38px" }}
        />
      ) : (
        <img
          src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
          alt="Refine"
          width="140px"
          style={{ minHeight: "38px" }}
        />
      )}
    </ChakraLink>
  );
};
