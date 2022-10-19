import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineExportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { ActionIcon, Button, ButtonProps } from "@mantine/core";
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

    const { variant, styles, ...commonProps } = rest;

    return hideText ? (
        <ActionIcon
            {...(variant ? {} : { variant: "default" })}
            loading={loading}
            data-testid={RefineButtonTestIds.ExportButton}
            {...commonProps}
        >
            <IconFileExport size={18} {...svgIconProps} />
        </ActionIcon>
    ) : (
        <Button
            variant="default"
            loading={loading}
            leftIcon={<IconFileExport size={18} {...svgIconProps} />}
            data-testid={RefineButtonTestIds.ExportButton}
            {...rest}
        >
            {children ?? translate("buttons.export", "Export")}
        </Button>
    );
};
