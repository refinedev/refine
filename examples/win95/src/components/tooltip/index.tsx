import { PropsWithChildren, ReactNode } from "react";
import { Tooltip, TooltipProps } from "react95";

type Props = {
  content: ReactNode;
} & Omit<TooltipProps, "text">;

export const Popover = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <Tooltip {...props} style={{ color: "black" }} text={props.content as any}>
      {children}
    </Tooltip>
  );
};
