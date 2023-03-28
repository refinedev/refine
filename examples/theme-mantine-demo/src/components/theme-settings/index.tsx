import {
    Box,
    Button,
    Center,
    Group,
    MantineThemeOverride,
    Modal,
    useMantineColorScheme,
} from "@mantine/core";
import { useModal } from "@refinedev/core";
import { RefineThemes } from "@refinedev/mantine";
import { FC } from "react";

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

    const dark = colorScheme === "dark";

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 100,
                }}
            >
                <Button onClick={show}>Open Theme settings</Button>
            </Box>
            <Modal onClose={close} opened={visible} title="Theme Settings">
                <Group position="left">
                    {Object.keys(RefineThemes).map((key) => {
                        const themeName = key as keyof typeof RefineThemes;
                        const theme = { ...RefineThemes[themeName] };

                        return (
                            <Button
                                compact
                                key={themeName}
                                color={refineThemeNameToMantineColors(
                                    themeName,
                                )}
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
                <Center mt="lg">
                    <Button color="gray" onClick={() => toggleColorScheme()}>
                        {dark ? "Light" : "Dark"} theme
                    </Button>
                </Center>
            </Modal>
        </>
    );
};

export default ThemeSettings;
