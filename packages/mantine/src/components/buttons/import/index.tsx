import React from "react";
import { useImportButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Button } from "@mantine/core";
import { IconFileImport } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { ImportButtonProps } from "../types";

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/api-reference/core/hooks/import-export/useImport/ `useImport`} core hook.
 * It uses uses Mantine {@link https://mantine.dev/core/button `<Button> component`} and native html {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input  `<input>`} element.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/import-button} for more details.
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
  inputProps,
  hideText = false,
  loading = false,
  svgIconProps,
  children,
  ...rest
}) => {
  const { label } = useImportButton();

  const { variant, styles, vars, ...commonProps } = rest;

  return (
    <label style={{ display: "flex" }}>
      <input {...inputProps} multiple hidden />
      {hideText ? (
        <ActionIcon
          variant={mapButtonVariantToActionIconVariant(variant, "default")}
          aria-label={label}
          component="span"
          loading={loading}
          data-testid={RefineButtonTestIds.ImportButton}
          className={RefineButtonClassNames.ImportButton}
          {...commonProps}
        >
          <IconFileImport size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant={variant || "default"}
          component="div"
          leftSection={<IconFileImport size={18} {...svgIconProps} />}
          loading={loading}
          data-testid={RefineButtonTestIds.ImportButton}
          className={RefineButtonClassNames.ImportButton}
          vars={vars}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </label>
  );
};
