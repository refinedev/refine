import type { IResourceItem } from "@refinedev/core";
import { prettyString } from "../pretty-string";
import { stringLiteral } from "../string-literal";
import type { InferField } from "../../types";

export const translatePrettyString = (payload: {
  resource: IResourceItem;
  field: InferField;
  i18n?: boolean;
  noQuotes?: boolean;
  noBraces?: boolean;
}) => {
  const { resource, field, i18n } = payload;

  if (i18n) {
    const translate = `translate(${stringLiteral(
      `${resource.name}.fields.${field.key}`,
    )})`;

    if (payload.noBraces) {
      return `${translate}`;
    }
    return `{${translate}}`;
  }

  const prettedString = prettyString(field.key);
  if (payload.noBraces) {
    return stringLiteral(prettedString);
  }

  const text = prettedString
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;")
    .replace(/\r/g, "&#13;")
    .replace(/\n/g, "&#10;")
    .replace(/\t/g, "&#9;");

  return payload.noQuotes ? text : `"${text}"`;
};
