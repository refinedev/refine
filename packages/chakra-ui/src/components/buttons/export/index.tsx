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
 * `<ExportButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
    hideText = false,
    children,
    loading = false,
    svgIconProps,
    ...rest
}) => {
    const translate = useTranslate();

    return hideText ? (
        <IconButton
            variant="outline"
            aria-label={translate("buttons.export", "Export")}
            loading={loading}
            data-testid={RefineButtonTestIds.ExportButton}
            {...rest}
        >
            <IconFileExport size={18} {...svgIconProps} />
        </IconButton>
    ) : (
        <Button
            size="sm"
            variant="outline"
            loading={loading}
            leftIcon={<IconFileExport size={18} {...svgIconProps} />}
            data-testid={RefineButtonTestIds.ExportButton}
            {...rest}
        >
            {children ?? translate("buttons.export", "Export")}
        </Button>
    );
};
