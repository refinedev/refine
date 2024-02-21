import React from "react";
import { useTranslate } from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Button } from "@mantine/core";
import { IconFileExport } from "@tabler/icons";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import { ExportButtonProps } from "../types";

/**
 * `<ExportButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> `} component with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
    hideText = false,
    children,
    loading = false,
    svgIconProps,
    ...rest
}) => {
    const translate = useTranslate();

    const { variant, styles, vars, ...commonProps } = rest;

    return hideText ? (
        <ActionIcon
            size="md"
            variant={mapButtonVariantToActionIconVariant(variant, "default")}
            loading={loading}
            data-testid={RefineButtonTestIds.ExportButton}
            // className={RefineButtonClassNames.ExportButton}
            {...commonProps}
        >
            <IconFileExport size={18} {...svgIconProps} />
        </ActionIcon>
    ) : (
        <Button
            variant="default"
            loading={loading}
            leftSection={<IconFileExport size={18} {...svgIconProps} />}
            data-testid={RefineButtonTestIds.ExportButton}
            vars={vars}
            // className={RefineButtonClassNames.ExportButton}
            {...rest}
        >
            {children ?? translate("buttons.export", "Export")}
        </Button>
    );
};
