import React from "react";
import { useDeleteButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import LoadingButton from "@mui/lab/LoadingButton";

import DeleteOutline from "@mui/icons-material/DeleteOutline";

import type { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Material UI {@link https://mui.com/material-ui/react-button `<Button>`} and {@link https://mui.com/material-ui/react-dialog/#main-content `<Dialog>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
  recordItemId,
  onSuccess,
  mutationMode,
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
  invalidates,
  ...rest
}) => {
  const {
    onConfirm,
    title,
    label,
    hidden,
    disabled,
    loading,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel,
    cancelLabel,
  } = useDeleteButton({
    resource: resourceNameFromProps ?? resourceNameOrRouteName,
    id: recordItemId,
    dataProviderName,
    mutationMode,
    accessControl,
    invalidates,
    onSuccess,
    meta,
    successNotification,
    errorNotification,
  });

  const [open, setOpen] = React.useState(false);

  const { sx, ...restProps } = rest;

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  return (
    <div>
      <LoadingButton
        color="error"
        onClick={() => setOpen(true)}
        disabled={isDisabled}
        loading={loading}
        startIcon={!hideText && <DeleteOutline {...svgIconProps} />}
        title={title}
        sx={{ minWidth: 0, ...sx }}
        loadingPosition={hideText ? "center" : "start"}
        data-testid={RefineButtonTestIds.DeleteButton}
        className={RefineButtonClassNames.DeleteButton}
        {...restProps}
      >
        {hideText ? (
          <DeleteOutline fontSize="small" {...svgIconProps} />
        ) : (
          children ?? label
        )}
      </LoadingButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {confirmTitle ?? defaultConfirmTitle}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setOpen(false)}>
            {confirmCancelText ?? cancelLabel}
          </Button>
          <Button
            color="error"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            autoFocus
          >
            {confirmOkText ?? confirmOkLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
