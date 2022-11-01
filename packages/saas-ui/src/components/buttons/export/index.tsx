import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineExportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { IconButton, Button, ButtonProps } from "@chakra-ui/react";
import { IconFileExport, TablerIconProps } from "@tabler/icons";

export type ExportButtonProps = RefineExportButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

/**
 * `<ExportButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button> `} component with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
    hideText = false,
    children,
    loading = false,
    svgIconProps,
    ...rest
}) => {
    const translate = useTranslate();

    const icon = <IconFileExport size={18} {...svgIconProps} />;

    return hideText ? (
        <IconButton
            icon={icon}
            aria-label={translate("buttons.export", "Export")}
            loading={loading}
            data-testid={RefineButtonTestIds.ExportButton}
            {...rest}
        />
    ) : (
        <Button
            variant="default"
            loading={loading}
            leftIcon={icon}
            data-testid={RefineButtonTestIds.ExportButton}
            {...rest}
        >
            {children ?? translate("buttons.export", "Export")}
        </Button>
    );
};
