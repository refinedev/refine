import React from "react";
import {
    useOne,
    useTranslate,
    useResource,
    pickNotDeprecated,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import { RefreshButtonProps } from "../types";

/**
 * `<RefreshButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button> `} component.
 * to update the data shown on the page via the {@link https://refine.dev/docs/core/hooks/data/useOne `useOne`} method provided by your dataProvider.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    meta,
    metaData,
    dataProviderName,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const { resource, id } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

    const translate = useTranslate();

    const { refetch, isFetching } = useOne({
        resource: resource?.name,
        id: recordItemId ?? id,
        queryOptions: {
            enabled: false,
        },
        meta: pickNotDeprecated(meta, metaData),
        metaData: pickNotDeprecated(meta, metaData),
        liveMode: "off",
        dataProviderName,
    });

    const { variant, styles, ...commonProps } = rest;

    return hideText ? (
        <ActionIcon
            onClick={(e: React.PointerEvent<HTMLButtonElement>) =>
                onClick ? onClick(e) : refetch()
            }
            loading={isFetching}
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
            loading={isFetching}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) =>
                onClick ? onClick(e) : refetch()
            }
            data-testid={RefineButtonTestIds.RefreshButton}
            className={RefineButtonClassNames.RefreshButton}
            {...rest}
        >
            {children ?? translate("buttons.refresh", "Refresh")}
        </Button>
    );
};
