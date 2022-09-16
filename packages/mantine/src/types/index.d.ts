import { Tuple, DefaultMantineColor } from "@mantine/core";

declare module "*.svg" {
    const content: string;
    export default content;
}

type ExtendedCustomColors = "primary" | DefaultMantineColor;

declare module "@mantine/core" {
    export interface MantineThemeColorsOverride {
        colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
    }
}
