import React from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { Center, Text, useMantineTheme } from "@mantine/core";
import { RefineLayoutThemedTitleProps } from "../types";

const defaultText = "refine Project";

const defaultIcon = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="refine-logo"
    >
        <path
            d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z"
            fill="currentColor"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V6Z"
            fill="currentColor"
        />
    </svg>
);

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedTitle: React.FC<RefineLayoutThemedTitleProps> = ({
    collapsed,
    icon = defaultIcon,
    text = defaultText,
    wrapperStyles = {},
}) => {
    const theme = useMantineTheme();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    return (
        <ActiveLink to="/" style={{ all: "unset" }}>
            <Center
                style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: "8px",
                    ...wrapperStyles,
                }}
            >
                <Text
                    lh={0}
                    fz="inherit"
                    color={theme.colorScheme === "dark" ? "brand.5" : "brand.6"}
                >
                    {icon}
                </Text>
                {!collapsed && (
                    <Text
                        fz="inherit"
                        color={theme.colorScheme === "dark" ? "white" : "black"}
                    >
                        {text}
                    </Text>
                )}
            </Center>
        </ActiveLink>
    );
};
