import React from "react";

import {
    useCan,
    useNavigation,
    useTranslate,
    BaseKey,
    useResource,
} from "@pankod/refine-core";

import { Button, ButtonProps } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export type ShowButtonProps = ButtonProps & {
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * `<ShowButton>` uses uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when red sirecting the app to the show page with the record id route of resource.
 *
 */
export const ShowButton: React.FC<ShowButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    onClick,
    ...rest
}) => {
    const { resourceName, id, resource } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const { show } = useNavigation();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "show",
        params: { id },
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
                onClick ? onClick(e) : show(resource.route!, id!)
            }
            disabled={data?.can === false}
            startIcon={!hideText && <VisibilityOutlinedIcon />}
            title={disabledTitle()}
            {...rest}
        >
            {hideText ? (
                <VisibilityOutlinedIcon />
            ) : (
                children ?? translate("buttons.show", "Show")
            )}
        </Button>
    );
};
