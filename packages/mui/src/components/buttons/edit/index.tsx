import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    BaseKey,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";

import { Button, ButtonProps } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export type EditButtonProps = ButtonProps & {
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * `<EditButton>` uses uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 */
export const EditButton: React.FC<EditButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    onClick,
    ...rest
}) => {
    const { resourceName, resource, id } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const translate = useTranslate();

    const { editUrl: generateEditUrl } = useNavigation();
    const { Link } = useRouterContext();

    const { data } = useCan({
        resource: resourceName,
        action: "edit",
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

    const editUrl = generateEditUrl(resource.route!, id!);

    return (
        <Link
            to={editUrl}
            href={editUrl}
            replace={false}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            style={{ textDecoration: "none" }}
        >
            <Button
                disabled={data?.can === false}
                startIcon={!hideText && <EditOutlinedIcon />}
                title={disabledTitle()}
                {...rest}
            >
                {hideText ? (
                    <EditOutlinedIcon />
                ) : (
                    children ?? translate("buttons.edit", "Edit")
                )}
            </Button>
        </Link>
    );
};
