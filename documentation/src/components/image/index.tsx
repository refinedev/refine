import React from "react";
import clsx from "clsx";

export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    {...props}
    className={clsx(
      "w-full h-auto",
      "object-contain",
      "object-center",
      "rounded-md",
      props.className,
    )}
    loading="lazy"
    decoding="async"
    alt={props.alt ?? ""}
  />
);
