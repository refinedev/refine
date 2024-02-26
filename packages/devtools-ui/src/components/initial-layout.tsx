import React from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
};

export const InitialLayout = ({ children }: Props) => {
  return (
    <div
      className={clsx(
        "re-bg-gray-900",
        "re-flex",
        "re-items-center",
        "re-justify-center",
        "re-h-auto",
        "re-p-0",
        "re-min-h-screen",
      )}
    >
      {children}
    </div>
  );
};
