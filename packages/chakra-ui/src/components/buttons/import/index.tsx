import React from "react";
import { useTranslate } from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconFileImport } from "@tabler/icons";

import { ImportButtonProps } from "../types";

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/core/hooks/import-export/useImport/ `useImport`} core hook.
 * It uses uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> component`} and native html {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input  `<input>`} element.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/buttons/import-button} for more details.
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

    return (
        <label htmlFor="contained-button-file">
            <input {...inputProps} id="contained-button-file" multiple hidden />
            {hideText ? (
                <IconButton
                    variant="outline"
                    as="span"
                    aria-label={translate("buttons.import", "Import")}
                    isLoading={loading}
                    data-testid={RefineButtonTestIds.ImportButton}
                    className={RefineButtonClassNames.ImportButton}
                    {...rest}
                >
                    <IconFileImport size={20} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    variant="outline"
                    as="span"
                    leftIcon={<IconFileImport size={20} {...svgIconProps} />}
                    isLoading={loading}
                    data-testid={RefineButtonTestIds.ImportButton}
                    className={RefineButtonClassNames.ImportButton}
                    {...rest}
                >
                    {children ?? translate("buttons.import", "Import")}
                </Button>
            )}
        </label>
    );
};
