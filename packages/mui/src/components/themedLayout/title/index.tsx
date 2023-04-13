import React from "react";
import { useRouterContext, useLink, useRouterType } from "@refinedev/core";
import { Link as MuiLink, SvgIcon, Typography } from "@mui/material";
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
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedTitle: React.FC<RefineLayoutThemedTitleProps> = ({
    collapsed,
    wrapperStyles,
    icon = defaultIcon,
    text = defaultText,
}) => {
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    return (
        <MuiLink
            to="/"
            component={ActiveLink}
            underline="none"
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                ...wrapperStyles,
            }}
        >
            <SvgIcon height="24px" width="24px" color="primary">
                {icon}
            </SvgIcon>
            {!collapsed && (
                <Typography
                    variant="h6"
                    fontWeight={700}
                    color="text.primary"
                    fontSize="inherit"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    {text}
                </Typography>
            )}
        </MuiLink>
    );
};
