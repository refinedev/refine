"use client";

import type { RefineListButtonProps } from "@refinedev/ui-types";
import type { VariantProps } from "class-variance-authority";
import { useListButton } from "@refinedev/core";
import { Button, type buttonVariants } from "@/registry/default/ui/button";

type ListButtonProps = {
  /**
   * Props are related to refine core.
   * @link https://refine.dev/docs/guides-concepts/ui-libraries/#buttons
   */
  refineCoreProps?: Pick<
    RefineListButtonProps,
    "resource" | "accessControl" | "meta"
  >;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function ListButton({
  refineCoreProps = {},
  children,
  onClick,
  ...rest
}: ListButtonProps) {
  const { hidden, disabled, LinkComponent, to } =
    useListButton(refineCoreProps);

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

ListButton.displayName = "ListButton";
