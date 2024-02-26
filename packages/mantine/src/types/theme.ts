import "@mantine/core";

type ExtendedCustomColors =
  | "primary"
  | import("@mantine/core").DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<
      ExtendedCustomColors,
      import("@mantine/core").Tuple<string, 10>
    >;
  }
}
