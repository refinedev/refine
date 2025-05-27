"use client";

import type { RefineCreateButtonProps } from "@refinedev/ui-types";
import type { VariantProps } from "class-variance-authority";
import { useCreateButton } from "@refinedev/core";

import { Plus } from "lucide-react";

import { Button, type buttonVariants } from "@/registry/default/ui/button";

type CreateButtonProps = {
  /**
   * Props are related to refine core.
   * @link https://refine.dev/docs/guides-concepts/ui-libraries/#buttons
   */
  refineCoreProps?: Pick<
    RefineCreateButtonProps,
    "resource" | "accessControl" | "meta"
  >;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function CreateButton({
  refineCoreProps = {},
  children,
  onClick,
  ...rest
}: CreateButtonProps) {
  const { hidden, disabled, LinkComponent, to, label } =
    useCreateButton(refineCoreProps);

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
            <Plus className="w-4 h-4" />
            <span>{label ?? "Create"}</span>
          </div>
        )}
      </LinkComponent>
    </Button>
  );
}

CreateButton.displayName = "CreateButton";
