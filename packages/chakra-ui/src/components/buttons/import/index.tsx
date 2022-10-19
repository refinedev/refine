import React from "react";
import { useTranslate, UseImportInputPropsType } from "@pankod/refine-core";
import {
    RefineImportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { ActionIcon, Button, ButtonProps } from "@mantine/core";
import { IconFileImport, TablerIconProps } from "@tabler/icons";

export type ImportButtonProps = RefineImportButtonProps<
    ButtonProps,
    {
        inputProps: UseImportInputPropsType;
        svgIconProps?: TablerIconProps;
    }
>;

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/core/hooks/import-export/useImport/ `useImport`} core hook.
 * It uses uses Mantine {@link https://mantine.dev/core/button/ `<Button> component`} and native html {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input  `<input>`} element.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/import-button} for more details.
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
    inputProps,
    hideText = false,
    loading = false,
    svgIconProps,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    const { variant, styles, ...commonProps } = rest;

    return (
        <label htmlFor="contained-button-file">
            <input {...inputProps} id="contained-button-file" multiple hidden />
            {hideText ? (
                <ActionIcon
                    {...(variant ? {} : { variant: "default" })}
                    component="span"
                    loading={loading}
                    data-testid={RefineButtonTestIds.ImportButton}
                    {...commonProps}
                >
                    <IconFileImport size={18} {...svgIconProps} />
                </ActionIcon>
            ) : (
                <Button
                    variant="default"
                    component="span"
                    leftIcon={<IconFileImport size={18} {...svgIconProps} />}
                    loading={loading}
                    data-testid={RefineButtonTestIds.ImportButton}
                    {...rest}
                >
                    {children ?? translate("buttons.import", "Import")}
                </Button>
            )}
        </label>
    );
};
