import { ActionIcon, Burger, Flex, Group } from "@mantine/core";

import { ColorSchemeControl } from "./ColorSchemeControl";

import { useThemedLayoutContext } from "@refinedev/mantine";

import classes from "./header.module.css";

export const Header: React.FC = () => {
  const { mobileSiderOpen, setMobileSiderOpen } = useThemedLayoutContext();

  return (
    <Group
      align="center"
      justify="space-between"
      wrap="nowrap"
      className={classes.header}
    >
      <Burger
        opened={mobileSiderOpen}
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
        size="sm"
        hiddenFrom="sm"
      />
      <ColorSchemeControl />
    </Group>
  );
};
