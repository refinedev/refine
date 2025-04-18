import React from "react";
import cx from "clsx";
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { UnstyledButton, Tooltip, type BoxProps } from "@mantine/core";
import classes from "./ColorSchemeControl.module.css";

export interface HeaderControlProps extends BoxProps {
  tooltip: string;
  children: React.ReactNode;
}

export function ColorSchemeControl() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const dark = computedColorScheme === "dark";

  return (
    <Tooltip label={`${dark ? "Light" : "Dark"} mode`}>
      <UnstyledButton
        className={cx(classes.control)}
        onClick={() => setColorScheme(dark ? "light" : "dark")}
      >
        {dark ? (
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        ) : (
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        )}
      </UnstyledButton>
    </Tooltip>
  );
}
