import React from "react";
import {
  useRouterContext,
  type TitleProps,
  useRouterType,
  useLink,
} from "@refinedev/core";
import { Center } from "@mantine/core";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink to="/">
      <Center p="xs">
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
          />
        )}
      </Center>
    </ActiveLink>
  );
};
