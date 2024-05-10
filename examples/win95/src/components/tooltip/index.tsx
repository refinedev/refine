import { PropsWithChildren, ReactNode } from "react";
import { Tooltip, TooltipProps } from "react95";

type Props = {
  content: ReactNode;
} & Omit<TooltipProps, "text" | "content">;

export const Popover = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <Tooltip
      {...props}
      style={{ color: "black" }}
      // @ts-expect-error react95 types are incorrect. <Tooltip /> works with ReactNode but types are expecting a string
      text={props.content}
    >
      {children}
    </Tooltip>
  );
};
