"use client";

import type { RefineListButtonProps } from "@refinedev/ui-types";
import { useListButton } from "@refinedev/core";
import { Button } from "@/registry/default/ui/button";
import { List } from "lucide-react";

type ListButtonProps = {
  refineCoreProps?: Pick<
    RefineListButtonProps,
    "resource" | "accessControl" | "meta"
  >;
} & React.ComponentProps<typeof Button>;

export function ListButton({
  refineCoreProps = {},
  children,
  onClick,
  ...rest
}: ListButtonProps) {
  const { hidden, disabled, LinkComponent, to, label } =
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
        {children ?? (
          <div className="flex items-center gap-2 font-semibold">
            <List className="w-4 h-4" />
            <span>{label}</span>
          </div>
        )}
      </LinkComponent>
    </Button>
  );
}

ListButton.displayName = "ListButton";
