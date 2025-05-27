"use client";

import type { VariantProps } from "class-variance-authority";
import type { RefineCloneButtonProps } from "@refinedev/ui-types";
import { useCloneButton } from "@refinedev/core";
import { Button, type buttonVariants } from "@/registry/default/ui/button";
import { Copy } from "lucide-react";

type CloneButtonProps = {
  /**
   * Props are related to refine core.
   * @link https://refine.dev/docs/guides-concepts/ui-libraries/#buttons
   */
  refineCoreProps?: Pick<
    RefineCloneButtonProps,
    "resource" | "accessControl" | "meta" | "recordItemId"
  >;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function CloneButton({
  refineCoreProps = {},
  children,
  onClick,
  ...rest
}: CloneButtonProps) {
  const { hidden, disabled, LinkComponent, to, label } = useCloneButton({
    ...refineCoreProps,
    id: refineCoreProps.recordItemId,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  return (
    <Button {...rest} disabled={isDisabled} asChild>
      <LinkComponent
        to={to}
        replace={false}
        onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          if (onClick) {
            e.preventDefault();
            onClick(e);
          }
        }}
      >
        {children ?? (
          <div className="flex items-center gap-2 font-semibold">
            <Copy className="h-4 w-4" />
            <span>{label}</span>
          </div>
        )}
      </LinkComponent>
    </Button>
  );
}

CloneButton.displayName = "CloneButton";
