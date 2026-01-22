import React from "react";
import clsx from "clsx";

export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const shouldImgix =
    props.src?.endsWith(".avif") || props.src?.endsWith(".webp");

  const src = shouldImgix
    ? props.src
    : `https://refine-web.imgix.net${props.src?.replace(
        "https://refine.ams3.cdn.digitaloceanspaces.com",
        "",
      )}?fm=webp&auto=format`;

  return (
    <img
      {...props}
      src={src}
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
};
