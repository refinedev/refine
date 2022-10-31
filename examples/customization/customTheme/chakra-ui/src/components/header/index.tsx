import { Box, IconButton, Icon, useColorMode } from "@pankod/refine-chakra-ui";
import { IconMoon, IconSun } from "@tabler/icons";

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box
            py="2"
            px="4"
            display="flex"
            justifyContent="flex-end"
            w="full"
            bg="chakra-body-bg"
        >
            <IconButton
                variant="ghost"
                aria-label="Toggle theme"
                onClick={toggleColorMode}
            >
                <Icon
                    as={colorMode === "light" ? IconMoon : IconSun}
                    w="18px"
                    h="18px"
                />
            </IconButton>
        </Box>
    );
};
