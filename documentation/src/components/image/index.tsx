import React from "react";
import clsx from "clsx";

export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    {...props}
    className={clsx(
      "w-full h-auto",
      "object-contain",
      "object-center",
      "bg-gray-100 dark:bg-gray-800",
      "rounded-md",
      "border",
      "border-gray-200 dark:border-gray-700",
      props.className,
    )}
    loading="lazy"
    decoding="async"
    alt={props.alt ?? ""}
  />
);
