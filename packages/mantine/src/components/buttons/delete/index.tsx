import React, { useState } from "react";
import { useDeleteButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { Group, Text, Button, Popover, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Mantine {@link https://mantine.dev/core/button `<Button>`} and {@link https://mantine.dev/core/modal `<Modal>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
  recordItemId,
  onSuccess,
  mutationMode,
  invalidates,
  children,
  successNotification,
  errorNotification,
  hideText = false,
  accessControl,
  meta,
  metaData,
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  svgIconProps,
  ...rest
}) => {
  const {
    title,
    label,
    hidden,
    disabled,
    loading,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel: defaultConfirmOkLabel,
    cancelLabel: defaultCancelLabel,
    onConfirm,
  } = useDeleteButton({
    resource: resourceNameFromProps ?? resourceNameOrRouteName,
    id: recordItemId,
    dataProviderName,
    errorNotification,
    successNotification,
    invalidates,
    mutationMode,
    accessControl,
    meta,
    onSuccess,
  });

  const [opened, setOpened] = useState(false);

  // const onConfirm = () => {
  //   if ((recordItemId ?? id) && identifier) {
  //     setWarnWhen(false);
  //     setOpened(false);
  //     mutate(
  //       {
  //         id: recordItemId ?? id ?? "",
  //         resource: identifier,
  //         mutationMode,
  //         successNotification,
  //         errorNotification,
  //         meta: pickNotDeprecated(meta, metaData),
  //         metaData: pickNotDeprecated(meta, metaData),
  //         dataProviderName,
  //       },
  //       {
  //         onSuccess: (value) => {
  //           onSuccess?.(value);
  //         },
  //       },
  //     );
  //   }
  // };

  const { variant, styles, vars, ...commonProps } = rest;

  if (hidden) return null;

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      withArrow
      withinPortal
      disabled={
        typeof rest?.disabled !== "undefined" ? rest.disabled : disabled
      }
    >
      <Popover.Target>
        {hideText ? (
          <ActionIcon
            color="red"
            onClick={() => setOpened((o) => !o)}
            disabled={loading || disabled}
            loading={loading}
            data-testid={RefineButtonTestIds.DeleteButton}
            className={RefineButtonClassNames.DeleteButton}
            variant={mapButtonVariantToActionIconVariant(variant, "outline")}
            {...commonProps}
          >
            <IconTrash size={18} {...svgIconProps} />
          </ActionIcon>
        ) : (
          <Button
            color="red"
            variant="outline"
            onClick={() => setOpened((o) => !o)}
            disabled={loading || disabled}
            loading={loading}
            title={title}
            leftSection={<IconTrash size={18} {...svgIconProps} />}
            data-testid={RefineButtonTestIds.DeleteButton}
            className={RefineButtonClassNames.DeleteButton}
            vars={vars}
            {...rest}
          >
            {children ?? label}
          </Button>
        )}
      </Popover.Target>
      <Popover.Dropdown py="xs">
        <Text>{confirmTitle ?? defaultConfirmTitle}</Text>
        <Group mt="xs">
          <Button onClick={() => setOpened(false)} variant="default" size="xs">
            {confirmCancelText ?? defaultCancelLabel}
          </Button>
          <Button
            color="red"
            onClick={() => {
              onConfirm();
              setOpened(false);
            }}
            autoFocus
            size="xs"
          >
            {confirmOkText ?? defaultConfirmOkLabel}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
