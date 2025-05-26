"use client";

import type { VariantProps } from "class-variance-authority";
import type { RefineEditButtonProps } from "@refinedev/ui-types";
import { useEditButton } from "@refinedev/core";
import { Button, type buttonVariants } from "@/registry/default/ui/button";

type EditButtonProps = {
  /**
   * Props are related to refine core.
   * @link https://refine.dev/docs/guides-concepts/ui-libraries/#buttons
   */
  refineCoreProps?: Pick<
    RefineEditButtonProps,
    "resource" | "accessControl" | "meta" | "recordItemId"
  >;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function EditButton({
  refineCoreProps = {},
  children,
  onClick,
  ...rest
}: EditButtonProps) {
  const { hidden, disabled, LinkComponent, to } = useEditButton({
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
        {children}
      </LinkComponent>
    </Button>
  );
}

EditButton.displayName = "EditButton";
