import { PropsWithChildren, ReactNode } from "react";
import { Tooltip, TooltipProps } from "react95";

type Props = {
  content: ReactNode;
} & Omit<TooltipProps, "text">;

export const Popover = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <Tooltip
      {...props}
      style={{ color: "black" }}
      // @ts-expect-error - `text` prop supports ReactNode but the type definition only allows string
      text={props.content}
    >
      {children}
    </Tooltip>
  );
};
