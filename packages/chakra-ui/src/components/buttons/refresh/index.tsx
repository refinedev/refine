import React from "react";
import {
    useTranslate,
    useResource,
    useInvalidate,
    queryKeys,
    pickDataProvider,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconRefresh } from "@tabler/icons";

import { RefreshButtonProps } from "../types";

import { useQueryClient } from "@tanstack/react-query";

/**
 * `<RefreshButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component.
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    dataProviderName,
    svgIconProps,
    children,
    onClick,
    meta: _meta,
    metaData: _metaData,
    ...rest
}) => {
    const translate = useTranslate();

    const queryClient = useQueryClient();
    const invalidates = useInvalidate();

    const { resources, identifier, id } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

    const isInvalidating = !!queryClient.isFetching({
        queryKey: queryKeys(
            identifier,
            pickDataProvider(identifier, dataProviderName, resources),
        ).detail(recordItemId ?? id),
    });

    const handleInvalidate = () => {
        invalidates({
            id: recordItemId ?? id,
            invalidates: ["detail"],
            dataProviderName,
            resource: identifier,
        });
    };

    return hideText ? (
        <IconButton
            variant="outline"
            aria-label={translate("buttons.refresh", "Refresh")}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                onClick ? onClick(e) : handleInvalidate();
            }}
            isLoading={isInvalidating}
            data-testid={RefineButtonTestIds.RefreshButton}
            className={RefineButtonClassNames.RefreshButton}
            {...rest}
        >
            <IconRefresh size={20} {...svgIconProps} />
        </IconButton>
    ) : (
        <Button
            variant="outline"
            leftIcon={<IconRefresh size={20} {...svgIconProps} />}
            isLoading={isInvalidating}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                onClick ? onClick(e) : handleInvalidate();
            }}
            data-testid={RefineButtonTestIds.RefreshButton}
            className={RefineButtonClassNames.RefreshButton}
            {...rest}
        >
            {children ?? translate("buttons.refresh", "Refresh")}
        </Button>
    );
};
