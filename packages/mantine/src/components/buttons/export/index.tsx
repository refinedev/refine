import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineExportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { Button, ButtonProps } from "@mantine/core";
import { ArrowsUpDown, IconProps } from "tabler-icons-react";

export type ExportButtonProps = RefineExportButtonProps<
    ButtonProps,
    {
        svgIconProps?: IconProps;
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

    const { sx, ...restProps } = rest;

    return (
        <Button
            {...rest}
            variant="subtle"
            loading={loading}
            leftIcon={!hideText && <ArrowsUpDown {...svgIconProps} />}
            sx={{ minWidth: 0, ...sx }}
            data-testid={RefineButtonTestIds.ExportButton}
            {...restProps}
        >
            {hideText ? (
                <ArrowsUpDown fontSize="small" {...svgIconProps} />
            ) : (
                children ?? translate("buttons.export", "Export")
            )}
        </Button>
    );
};
