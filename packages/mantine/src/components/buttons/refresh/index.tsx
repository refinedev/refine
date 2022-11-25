import React from "react";
import { useOne, useTranslate, useResource } from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";
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
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    metaData,
    dataProviderName,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const { resourceName, id } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const translate = useTranslate();

    const { refetch, isFetching } = useOne({
        resource: resourceName,
        id: id ?? "",
        queryOptions: {
            enabled: false,
        },
        metaData,
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
            {...rest}
        >
            {children ?? translate("buttons.refresh", "Refresh")}
        </Button>
    );
};
