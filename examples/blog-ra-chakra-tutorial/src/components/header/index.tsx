import {
    Avatar,
    Box,
    BoxProps,
    HStack,
    Icon,
    IconButton,
    Text,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import {
    HamburgerMenu,
    RefineThemedLayoutV2HeaderProps,
} from "@refinedev/chakra-ui";
import { useGetIdentity } from "@refinedev/core";
import { IconMoon, IconSun } from "@tabler/icons";
import React from "react";

type IUser = {
    id: number;
    name: string;
    avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
    sticky,
}) => {
    const { data: user } = useGetIdentity<IUser>();

    const { colorMode, toggleColorMode } = useColorMode();

    const bgColor = useColorModeValue(
        "refine.header.bg.light",
        "refine.header.bg.dark",
    );

    let stickyProps: BoxProps = {};
    if (sticky) {
        stickyProps = {
            position: "sticky",
            top: 0,
            zIndex: 1,
        };
    }

    return (
        <Box
            py="2"
            pr="4"
            pl="2"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            w="full"
            height="64px"
            bg={bgColor}
            borderBottom="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            {...stickyProps}
        >
            <HamburgerMenu />

            <HStack>
                <IconButton
                    variant="ghost"
                    aria-label="Toggle theme"
                    onClick={toggleColorMode}
                >
                    <Icon
                        as={colorMode === "light" ? IconMoon : IconSun}
                        w="24px"
                        h="24px"
                    />
                </IconButton>
                {(user?.avatar || user?.name) && (
                    <HStack>
                        {user?.name && (
                            <Text size="sm" fontWeight="bold">
                                {user.name}
                            </Text>
                        )}
                        <Avatar
                            size="sm"
                            name={user?.name}
                            src={user?.avatar}
                        />
                    </HStack>
                )}
            </HStack>
        </Box>
    );
};
