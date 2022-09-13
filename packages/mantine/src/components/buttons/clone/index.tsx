import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineCloneButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { Button, ButtonProps } from "@mantine/core";
import { SquarePlus, IconProps } from "tabler-icons-react";

export type CloneButtonProps = RefineCloneButtonProps<
    ButtonProps,
    {
        svgIconProps?: IconProps;
    }
>;

/**
 * `<CloneButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/clone-button} for more details.
 *
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
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

    const { cloneUrl: generateCloneUrl } = useNavigation();
    const { Link } = useRouterContext();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "create",
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

    const cloneUrl = generateCloneUrl(resource.route!, id!);

    const { sx, ...restProps } = rest;

    return (
        <Link
            to={cloneUrl}
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
                disabled={data?.can === false}
                variant="subtle"
                leftIcon={!hideText && <SquarePlus {...svgIconProps} />}
                title={disabledTitle()}
                sx={{ minWidth: 0, ...sx }}
                data-testid={RefineButtonTestIds.CloneButton}
                {...restProps}
            >
                {hideText ? (
                    <SquarePlus fontSize="small" {...svgIconProps} />
                ) : (
                    children ?? translate("buttons.clone", "Clone")
                )}
            </Button>
        </Link>
    );
};
