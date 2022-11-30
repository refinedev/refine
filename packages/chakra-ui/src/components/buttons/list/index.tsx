import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    userFriendlyResourceName,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconList } from "@tabler/icons";

import { ListButtonProps } from "../types";

/**
 * `<ListButton>` is using uses Mantine {@link https://chakra-ui.com/docs/components/button `<Button> `} component.
 * It uses the  {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/buttons/list-button} for more details.
 **/
export const ListButton: React.FC<ListButtonProps> = ({
    resourceNameOrRouteName,
    hideText = false,
    accessControl,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const accessControlEnabled = accessControl?.enabled;
    const hideIfUnauthorized = accessControl?.hideIfUnauthorized ?? false;
    const { resource, resourceName } = useResource({
        resourceNameOrRouteName,
    });

    const { listUrl: generateListUrl } = useNavigation();
    const { Link } = useRouterContext();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "list",
        queryOptions: {
            enabled: accessControlEnabled,
        },
        params: {
            resource,
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

    const listUrl = generateListUrl(resource.route!);

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Link
            to={listUrl}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            {hideText ? (
                <IconButton
                    variant="outline"
                    aria-label={translate(
                        `${resourceName}.titles.list`,
                        userFriendlyResourceName(
                            resource.label ?? resourceName,
                            "plural",
                        ),
                    )}
                    disabled={data?.can === false}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.ListButton}
                    {...rest}
                >
                    <IconList size={20} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    variant="outline"
                    disabled={data?.can === false}
                    leftIcon={<IconList size={20} {...svgIconProps} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.ListButton}
                    {...rest}
                >
                    {children ??
                        translate(
                            `${resourceName}.titles.list`,
                            userFriendlyResourceName(
                                resource.label ?? resourceName,
                                "plural",
                            ),
                        )}
                </Button>
            )}
        </Link>
    );
};
