import { useShowButton } from "@refinedev/core";
import type { VariantProps } from "class-variance-authority";
import type { RefineShowButtonProps } from "@refinedev/ui-types";
import { Button, type buttonVariants } from "@/registry/default/ui/button";

type ShowButtonProps = {
  /**
   * Props are related to refine core.
   * @link https://refine.dev/docs/guides-concepts/ui-libraries/#buttons
   */
  refineCoreProps?: Pick<
    RefineShowButtonProps,
    "resource" | "accessControl" | "meta" | "recordItemId"
  >;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export const ShowButton = ({
  refineCoreProps = {},
  children,
  onClick,
  ...rest
}: ShowButtonProps) => {
  const { hidden, disabled, LinkComponent, to } = useShowButton({
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
};
