import React from "react";
import { useOne, useTranslate, useResource } from "@pankod/refine-core";
import {
    RefineButtonTestIds,
    RefineRefreshButtonProps,
} from "@pankod/refine-ui-types";
import { IconButton, Button, ButtonProps } from "@chakra-ui/react";
import { IconRefresh, TablerIconProps } from "@tabler/icons";

export type RefreshButtonProps = RefineRefreshButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

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

    const icon = <IconRefresh size={18} {...svgIconProps} />;

    return hideText ? (
        <IconButton
            onClick={(e: React.PointerEvent<HTMLButtonElement>) =>
                onClick ? onClick(e) : refetch()
            }
            icon={icon}
            aria-label={translate("buttons.refresh", "Refresh")}
            isLoading={isFetching}
            data-testid={RefineButtonTestIds.RefreshButton}
            {...rest}
        ></IconButton>
    ) : (
        <Button
            leftIcon={<IconRefresh size={18} {...svgIconProps} />}
            isLoading={isFetching}
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
