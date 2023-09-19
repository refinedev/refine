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
import { ActionIcon, Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import { RefreshButtonProps } from "../types";

import { useQueryClient } from "@tanstack/react-query";

/**
 * `<RefreshButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> `} component.
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName: propResourceNameOrRouteName,
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
        resourceNameFromProps ?? propResourceNameOrRouteName,
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

    const { variant, styles: _styles, ...commonProps } = rest;

    return hideText ? (
        <ActionIcon
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                onClick ? onClick(e) : handleInvalidate();
            }}
            loading={isInvalidating}
            data-testid={RefineButtonTestIds.RefreshButton}
            className={RefineButtonClassNames.RefreshButton}
            {...(variant
                ? {
                      variant: mapButtonVariantToActionIconVariant(variant),
                  }
                : { variant: "default" })}
            {...commonProps}
        >
            <IconRefresh size={18} {...svgIconProps} />
        </ActionIcon>
    ) : (
        <Button
            variant="default"
            leftIcon={<IconRefresh size={18} {...svgIconProps} />}
            loading={isInvalidating}
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
