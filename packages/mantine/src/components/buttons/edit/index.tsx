import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineEditButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { Button, ButtonProps, Center } from "@mantine/core";
import { Pencil, IconProps } from "tabler-icons-react";

export type EditButtonProps = RefineEditButtonProps<
    ButtonProps,
    {
        svgIconProps?: IconProps;
    }
>;

/**
 * `<EditButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/edit-button} for more details.
 */
export const EditButton: React.FC<EditButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    ignoreAccessControlProvider = false,
    svgIconProps,
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
        params: { id, resource },
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

    const { sx, ...restProps } = rest;

    return (
        <Link
            to={editUrl}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            style={{ textDecoration: "none" }}
        >
            <Button
                variant="subtle"
                disabled={data?.can === false}
                leftIcon={
                    !hideText && (
                        <Center>
                            <Pencil {...svgIconProps} />
                        </Center>
                    )
                }
                title={disabledTitle()}
                sx={{ minWidth: 0, ...sx }}
                data-testid={RefineButtonTestIds.EditButton}
                {...restProps}
            >
                {hideText ? (
                    <Pencil fontSize="small" {...svgIconProps} />
                ) : (
                    children ?? translate("buttons.edit", "Edit")
                )}
            </Button>
        </Link>
    );
};
