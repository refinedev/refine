import mapValues from "lodash/mapValues";

export const upperCaseValues = (obj: any): any => {
  if (!obj) return undefined;
  return mapValues(obj, (v: any) => {
    if (typeof v === "string") return v.toUpperCase();
    if (v && typeof v === "object") return upperCaseValues(v);
    return v;
  });
};
