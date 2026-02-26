import React from "react";
import clsx from "clsx";

export function Date({ date, formattedDate, className }) {
  return (
    <time
      dateTime={date}
      itemProp="datePublished"
      className={clsx("uppercase", className)}
    >
      {formattedDate}
    </time>
  );
}
