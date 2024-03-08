import React from "react";
import clsx from "clsx";

import { PREVIEW_URL } from "./preview-url";

export const MUIExample = () => (
  <div className={clsx("pb-6", "h-[656px]")}>
    <iframe
      title="MUI Example"
      className={clsx(
        "absolute",
        "left-0",
        "right-0",
        "w-full",
        "px-2",
        "md:px-4",
        "xl:px-6",
        "max-w-screen-xl",
        "mx-auto",
        "min-h-max",
        "h-[656px]",
      )}
      src={PREVIEW_URL}
    />
  </div>
);
