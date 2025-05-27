"use client";

import React from "react";

import type { VariantProps } from "class-variance-authority";
import type { RefineDeleteButtonProps } from "@refinedev/ui-types";
import { useDeleteButton } from "@refinedev/core";

import { Loader2, Trash } from "lucide-react";

import { Button, type buttonVariants } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

type DeleteButtonProps = {
  /**
   * Props are related to refine core.
   * @link https://refine.dev/docs/guides-concepts/ui-libraries/#buttons
   */
  refineCoreProps?: RefineDeleteButtonProps;
} & Omit<React.ComponentProps<typeof Button>, "onClick"> & // Omit Button's onClick
  VariantProps<typeof buttonVariants>;

export function DeleteButton({
  refineCoreProps = {},
  children,
  ...rest
}: DeleteButtonProps) {
  // Correctly extract loading and onConfirm from the hook's return object
  const {
    hidden,
    disabled,
    loading,
    onConfirm,
    label,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel: defaultConfirmOkLabel,
    cancelLabel: defaultCancelLabel,
  } = useDeleteButton({
    ...refineCoreProps,
    id: refineCoreProps.recordItemId,
  });
  const [open, setOpen] = React.useState(false);

  const isDisabled = disabled || rest.disabled || loading;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  const confirmCancelText =
    refineCoreProps.confirmCancelText ?? defaultCancelLabel;
  const confirmOkText = refineCoreProps.confirmOkText ?? defaultConfirmOkLabel;
  const confirmTitle = refineCoreProps.confirmTitle ?? defaultConfirmTitle;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>
          <Button variant="destructive" {...rest} disabled={isDisabled}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children ?? (
              <div className="flex items-center gap-2 font-semibold">
                <Trash className="h-4 w-4" />
                <span>{label}</span>
              </div>
            )}
          </Button>
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="start">
        <div className="flex flex-col gap-2">
          <p className="text-sm">{confirmTitle}</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              {confirmCancelText}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={loading}
              onClick={() => {
                if (typeof onConfirm === "function") {
                  onConfirm();
                }
                setOpen(false);
              }}
            >
              {confirmOkText}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

DeleteButton.displayName = "DeleteButton";
