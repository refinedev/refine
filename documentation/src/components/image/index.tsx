import React from "react";
import clsx from "clsx";

export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    {...props}
    src={`https://refine-web.imgix.net${props.src?.replace(
      "https://refine.ams3.cdn.digitaloceanspaces.com",
      "",
    )}?fm=webp&auto=format`}
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
