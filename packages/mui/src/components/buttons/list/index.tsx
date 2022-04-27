import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    userFriendlyResourceName,
    useResource,
} from "@pankod/refine-core";

import { Button, ButtonProps } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

export type ListButtonProps = ButtonProps & {
    resourceNameOrRouteName?: string;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * `<ListButton>` is using uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses the  {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 */
export const ListButton: React.FC<ListButtonProps> = ({
    resourceNameOrRouteName,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    onClick,
    ...rest
}) => {
    const { resource, resourceName } = useResource({
        resourceNameOrRouteName,
    });

    const { list } = useNavigation();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "list",
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
    });

    const disabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    return (
        <Button
            onClick={(e): void =>
                onClick ? onClick(e) : list(resource.route!, "push")
            }
            disabled={data?.can === false}
            startIcon={!hideText && <ListOutlinedIcon />}
            title={disabledTitle()}
            {...rest}
        >
            {hideText ? (
                <ListOutlinedIcon />
            ) : (
                children ??
                translate(
                    `${resourceName}.titles.list`,
                    userFriendlyResourceName(
                        resource.label ?? resourceName,
                        "plural",
                    ),
                )
            )}
        </Button>
    );
};
