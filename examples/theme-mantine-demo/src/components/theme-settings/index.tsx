import {
  Box,
  Button,
  Group,
  type MantineThemeOverride,
  Modal,
  useMantineColorScheme,
} from "@mantine/core";
import { useModal } from "@refinedev/core";
import { RefineThemes } from "@refinedev/mantine";
import type { FC } from "react";

type ThemeName = keyof typeof RefineThemes;

const refineThemeNameToMantineColors = (name: keyof typeof RefineThemes) => {
  if (name === "Purple") return "violet";

  return name.toLowerCase();
};

type Props = {
  onThemeClick: (theme: MantineThemeOverride) => void;
};

const ThemeSettings: FC<Props> = ({ onThemeClick }) => {
  const { visible, show, close } = useModal();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <>
      <Box
        style={{
          position: "fixed",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 300,
        }}
      >
        <Button onClick={show}>Open Theme settings</Button>
      </Box>
      <Modal onClose={close} opened={visible} title="Theme Settings">
        <Group align="left" gap="sm">
          {Object.keys(RefineThemes).map((key) => {
            const themeName = key as ThemeName;
            const theme = { ...RefineThemes[themeName] };

            return (
              <Button
                size="compact-md"
                key={themeName}
                color={refineThemeNameToMantineColors(themeName)}
                onClick={() => {
                  onThemeClick(theme);
                  close();
                }}
              >
                {themeName}
              </Button>
            );
          })}
        </Group>
        <Button mt="lg" variant="default" onClick={() => toggleColorScheme()}>
          Set Mode to {isDark ? "Light ☀️" : "Dark  🌑"}
        </Button>
      </Modal>
    </>
  );
};

export default ThemeSettings;
