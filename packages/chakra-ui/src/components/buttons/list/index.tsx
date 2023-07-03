import React, { useContext } from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useUserFriendlyName,
    useResource,
    useRouterContext,
    useRouterType,
    useLink,
    pickNotDeprecated,
    AccessControlContext,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconList } from "@tabler/icons";

import { ListButtonProps } from "../types";

/**
 * `<ListButton>` is using uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component.
 * It uses the  {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/list-button} for more details.
 **/
export const ListButton: React.FC<ListButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName,
    hideText = false,
    accessControl,
    svgIconProps,
    meta,
    children,
    onClick,
    ...rest
}) => {
    const accessControlContext = useContext(AccessControlContext);

    const accessControlEnabled =
        accessControl?.enabled ??
        accessControlContext.options.buttons.enableAccessControl;

    const hideIfUnauthorized =
        accessControl?.hideIfUnauthorized ??
        accessControlContext.options.buttons.hideIfUnauthorized;
    const { listUrl: generateListUrl } = useNavigation();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const getUserFriendlyName = useUserFriendlyName();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const translate = useTranslate();

    const { resource, identifier } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

    const { data } = useCan({
        resource: resource?.name,
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

    const listUrl = resource ? generateListUrl(resource, meta) : "";

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <ActiveLink
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
                        `${identifier}.titles.list`,
                        getUserFriendlyName(
                            resource?.meta?.label ??
                                resource?.label ??
                                identifier ??
                                resourceNameOrRouteName,
                            "plural",
                        ),
                    )}
                    isDisabled={data?.can === false}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.ListButton}
                    className={RefineButtonClassNames.ListButton}
                    {...rest}
                >
                    <IconList size={20} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    variant="outline"
                    isDisabled={data?.can === false}
                    leftIcon={<IconList size={20} {...svgIconProps} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.ListButton}
                    className={RefineButtonClassNames.ListButton}
                    {...rest}
                >
                    {children ??
                        translate(
                            `${
                                identifier ??
                                resourceNameFromProps ??
                                resourceNameOrRouteName
                            }.titles.list`,
                            getUserFriendlyName(
                                resource?.meta?.label ??
                                    resource?.label ??
                                    identifier ??
                                    pickNotDeprecated(
                                        resourceNameFromProps,
                                        resourceNameOrRouteName,
                                    ),
                                "plural",
                            ),
                        )}
                </Button>
            )}
        </ActiveLink>
    );
};
