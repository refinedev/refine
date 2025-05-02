import { useRefreshButton } from "@refinedev/core";
import type { VariantProps } from "class-variance-authority";
import type { RefineRefreshButtonProps } from "@refinedev/ui-types";
import { Button, type buttonVariants } from "@/registry/default/ui/button";
import { Loader2 } from "lucide-react";

type RefreshButtonProps = {
  /**
   * Props are related to refine core.
   * @link https://refine.dev/docs/guides-concepts/ui-libraries/#buttons
   */
  refineCoreProps?: RefineRefreshButtonProps;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export const RefreshButton = ({
  refineCoreProps = {},
  children,
  ...rest
}: RefreshButtonProps) => {
  const { onClick, loading } = useRefreshButton({
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
        onClick();
      }}
      {...rest}
      disabled={isDisabled}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};
