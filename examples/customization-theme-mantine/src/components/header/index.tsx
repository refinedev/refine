import {
    ActionIcon,
    Group,
    MantineHeader,
    useMantineColorScheme,
} from "@pankod/refine-mantine";
import { IconSun, IconMoonStars } from "@tabler/icons";

export const Header: React.FC = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <MantineHeader height={50} p="xs">
            <Group position="right">
                <ActionIcon
                    variant="outline"
                    color={dark ? "yellow" : "primary"}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
            </Group>
        </MantineHeader>
    );
};
