import React from "react";

import {
    useNavigation,
    useTranslate,
    useCan,
    useResource,
} from "@pankod/refine-core";

import { Button, ButtonProps } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export type CreateButtonProps = ButtonProps & {
    resourceNameOrRouteName?: string;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * <CreateButton> uses Material UI {@link https://mui.com/components/buttons/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 */
export const CreateButton: React.FC<CreateButtonProps> = ({
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

    const translate = useTranslate();

    const { create } = useNavigation();

    const { data } = useCan({
        resource: resourceName,
        action: "create",
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
                onClick ? onClick(e) : create(resource.route!, "push")
            }
            disabled={data?.can === false}
            startIcon={!hideText && <AddBoxOutlinedIcon />}
            title={disabledTitle()}
            {...rest}
        >
            {hideText ? (
                <AddBoxOutlinedIcon />
            ) : (
                children ?? translate("buttons.create", "Create")
            )}
        </Button>
    );
};
