import { useRefreshButton } from "@refinedev/core";
import type { VariantProps } from "class-variance-authority";
import type { RefineRefreshButtonProps } from "@refinedev/ui-types";
import { Button, type buttonVariants } from "@/registry/default/ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type RefreshButtonProps = {
  /**
   * Props are related to refine core.
   * @link https://refine.dev/docs/guides-concepts/ui-libraries/#buttons
   */
  refineCoreProps?: RefineRefreshButtonProps;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function RefreshButton({
  refineCoreProps = {},
  children,
  ...rest
}: RefreshButtonProps) {
  const {
    onClick: refresh,
    loading,
    label,
  } = useRefreshButton({
    ...refineCoreProps,
    id: refineCoreProps.recordItemId,
  });

  const isDisabled = rest.disabled || loading;

  return (
    <Button
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        refresh();
      }}
      {...rest}
      disabled={isDisabled}
    >
      {children ?? (
        <div className="flex items-center gap-2">
          <RefreshCcw
            className={cn(loading && "animate-spin", "h-4 w-4", rest.className)}
          />
          <span>{label ?? "Refresh"}</span>
        </div>
      )}
    </Button>
  );
}
