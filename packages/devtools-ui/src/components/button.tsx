import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button({ children, onClick, className }, ref) {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={clsx(
          "re-rounded",
          "re-py-2",
          "re-px-4",
          "re-text-xs",
          "re-text-gray-0",
          "re-bg-brand-blue",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
