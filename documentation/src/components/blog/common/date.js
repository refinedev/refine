import React from "react";

export function Date({ date, formattedDate }) {
  return (
    <time dateTime={date} itemProp="datePublished" className="uppercase">
      {formattedDate}
    </time>
  );
}
