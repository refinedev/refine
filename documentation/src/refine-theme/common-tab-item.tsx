import React from "react";
import clsx from "clsx";

export default function CommonTabItem({ children, hidden, className }) {
  return (
    <div role="tabpanel" className={clsx(className)} {...{ hidden }}>
      {children}
    </div>
  );
}
